'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ReactElement, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { ResultMessage } from '@/actions/auth-messages';
import { reset } from '@/actions/reset';
import { CardWrapper } from '@/components/auth/card-wrapper/card-wrapper';
import { FormErrorMessage, FormSuccessMessage } from '@/components/form-messages';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SIGN_IN_PAGE } from '@/routes';
import { ResetSchema } from '@/schemas';

export const ResetForm = (): ReactElement => {
  const [isPending, startTransition] = useTransition();
  const [resultMessage, setResultMessage] = useState<ResultMessage | undefined>();

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: ''
    }
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    console.log({ values });
    startTransition(() => {
      setResultMessage(undefined);
      reset(values)
        .then((resultMessage: ResultMessage) => {
          setResultMessage(resultMessage);
        });
    });
  };

  return (
    <CardWrapper
      titleLabel="🔐 Auth"
      headerLabel="Forgot your password?"
      backButtonLabel="Back to login"
      backButtonHref={SIGN_IN_PAGE}
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
          </div>
          <FormSuccessMessage message={resultMessage?.success}/>
          <FormErrorMessage message={resultMessage?.error}/>
          <Button
            type="submit"
            disabled={isPending}
            className="w-full"
          >
            Send reset email
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};