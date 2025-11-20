'use client';

import { sendMessage } from '@/app/actions';
import { startTransition, useActionState, useEffect, useRef, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

export default function Contact() {
  const [state, formAction, isPending] = useActionState(sendMessage, null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const prevSuccessRef = useRef<boolean | undefined>(undefined);
  const prevStateRef = useRef(state);

  useEffect(() => {
    const wasSuccess = prevSuccessRef.current;
    const isSuccess = state?.success;

    if (isSuccess && !wasSuccess) {
      startTransition(() => {
        setName('');
        setEmail('');
        setMessage('');
      });
    }

    prevSuccessRef.current = isSuccess;
  }, [state?.success]);

  useEffect(() => {
    if (state?.message && state !== prevStateRef.current) {
      startTransition(() => {
        setSnackbarOpen(true);
      });
      prevStateRef.current = state;
    }
  }, [state]);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      
      <form action={formAction} className="flex flex-col gap-4 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 border border-[#6D6D6D]">
          <input
            className="md:col-span-1 border border-[#6D6D6D] p-4 text-[#6D6D6D]"
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={isPending}
          />
          <input
            className="md:col-span-1 border border-[#6D6D6D] p-4 text-[#6D6D6D]"
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isPending}
          />
          <textarea
            className="col-span-1 md:col-span-2 border border-[#6D6D6D] p-4 text-[#6D6D6D]"
            name="message"
            id="message"
            placeholder="Message"
            rows={10}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            disabled={isPending}
          />
        </div>
        <button
          type="submit"
          className="bg-[#939BBA] text-white p-4 w-fit px-12 hover:opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isPending}
        >
          {isPending ? 'Sending...' : 'Send Message'}
        </button>
      </form>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={state?.success ? 6000 : null}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={state?.success ? 'success' : 'error'}
        >
          {state?.message}
        </Alert>
      </Snackbar>
    </div>
  );
}