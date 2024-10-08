'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ReactElement, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { ResultMessage } from '@/actions/auth-messages';
import { signInCredentials } from '@/actions/sign-in';
import { CardWrapper } from '@/components/auth/card-wrapper/card-wrapper';
import { FormErrorMessage, FormSuccessMessage } from '@/components/form-messages';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AUTH_RESET_PAGE, SIGN_IN_PAGE, SIGN_UP_PAGE } from '@/routes';
import { SignInSchema } from '@/schemas';

export const SignInForm = (): ReactElement => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [resultMessage, setResultMessage] = useState<ResultMessage | undefined>();

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });
  const searchParams = useSearchParams();
  const urlError = searchParams.get('error') === 'OAuthAccountNotLinked'
    ? 'Email already in use with different provider!' : '';

  const onSubmit = (values: z.infer<typeof SignInSchema>) => {
    startTransition(() => {
      router.replace(SIGN_IN_PAGE);
      setResultMessage(undefined);
      signInCredentials(values)
        .then((resultMessage: ResultMessage) => {
          setResultMessage(resultMessage);
        });
    });
  };

  return (
    <CardWrapper
      titleLabel="🔐 Auth"
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref={SIGN_UP_PAGE}
      showSocial
    >
      <Form {...form}>
        <form
          className="space-y-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="space-y-4">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="john.doe@example.com"
                      type="email"
                    >
                    </Input>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="***"
                      type="password"
                    >
                    </Input>
                  </FormControl>
                  <Button
                    size="sm"
                    variant="link"
                    asChild
                    className="px-0 font-normal"
                  >
                    <Link href={AUTH_RESET_PAGE}>
                      Forgot password?
                    </Link>
                  </Button>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>
          <FormSuccessMessage message={resultMessage?.success}/>
          <FormErrorMessage message={resultMessage?.error ?? urlError}/>
          <Button
            type="submit"
            disabled={isPending}
            className="w-full"
          >
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};