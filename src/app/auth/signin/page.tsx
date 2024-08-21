'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement your sign-in logic here
    console.log('Email:', email);
    console.log('Password:', password);
    router.push('/'); // Redirect to the home page after successful sign-in
  };

  return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Sign In</h1>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          {/* Your sign-in form fields */}
        </form>
      </div>
  );
}