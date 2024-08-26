'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ReactElement, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { ResultMessage } from '@/actions/auth-messages';
import { signUp } from '@/actions/sign-up';
import { CardWrapper } from '@/components/auth/card-wrapper/card-wrapper';
import { FormErrorMessage, FormSuccessMessage } from '@/components/form-messages';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SIGN_IN_PAGE } from '@/routes';
import { SignUpSchema } from '@/schemas';

export const SignUpForm = (): ReactElement => {
  const [isPending, startTransition] = useTransition();
  const [resultMessage, setResultMessage] = useState<ResultMessage | undefined>();
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  const onSubmit = (values: z.infer<typeof SignUpSchema>) => {
    startTransition(() => {
      setResultMessage(undefined);
      signUp(values)
        .then((resultMessage: ResultMessage) => {
          setResultMessage(resultMessage);
        });
    });
  };

  return (
    <CardWrapper
      titleLabel="🔐 Auth"
      headerLabel="Create an account"
      backButtonLabel="Already have an account?"
      backButtonHref={SIGN_IN_PAGE}
      showSocial
    >
      <Form {...form}>
        <form
          className="space-y-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="space-y-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="John Doe"
                      type="text"
                    >
                    </Input>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
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
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>
          <FormSuccessMessage message={resultMessage?.success}/>
          <FormErrorMessage message={resultMessage?.error}/>
          <Button
            type="submit"
            disabled={isPending}
            className="w-full"
          >
            Sign Up
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};