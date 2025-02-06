#!/usr/bin/env node
import { program } from 'commander';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../backend/src/index';
import React from 'react';
import { render } from 'ink';

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:4000/trpc',
    }),
  ],
});

program
  .name('lifer')
  .description('Life management CLI tool')
  .version('0.0.1');

program
  .command('hello [name]')
  .description('Say hello')
  .action(async (name?: string) => {
    const response = await trpc.hello.query(name);
    console.log(response);
  });

program.parse();
