import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        console.log('=== SIGN IN CALLBACK ===');
        console.log('User:', user.email);

        const { data: existingUser } = await supabaseAdmin
          .from('users')
          .select('*')
          .eq('email', user.email)
          .maybeSingle();

        if (!existingUser) {
          console.log('Creating new user...');

          const { data: newUser, error: insertError } = await supabaseAdmin
            .from('users')
            .insert({
              email: user.email,
              name: user.name,
              image: user.image,
              role: 'client',
            })
            .select()
            .single();

          if (insertError) {
            console.error('❌ Insert error:', insertError);
            return false;
          }

          console.log('✅ User created:', newUser.email);
        } else {
          console.log('✅ User exists:', existingUser.email);
        }

        return true;
      } catch (error) {
        console.error('❌ Error:', error);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        const { data: dbUser } = await supabaseAdmin
          .from('users')
          .select('id, role, image')
          .eq('email', user.email)
          .single();

        if (dbUser) {
          token.role = dbUser.role;
          token.id = dbUser.id;
          token.picture = dbUser.image;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role || 'client';
        session.user.id = token.id;
        session.user.image = token.picture;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
});
