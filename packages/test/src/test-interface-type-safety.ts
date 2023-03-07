import test from 'ava';
import { defineSignal, defineQuery } from '@temporalio/workflow';

test('SignalDefinition Name type safety', (t) => {
  // @ts-expect-error Assert expect a type error when generic and concrete names do not match
  defineSignal<[string], 'mismatch'>('illegal value');

  const signalA = defineSignal<[string], 'a'>('a');
  const signalB = defineSignal<[string], 'b'>('b');

  type TypeAssertion = typeof signalB extends typeof signalA ? 'intermixable' : 'not-intermixable';

  const _assertion: TypeAssertion = 'not-intermixable';
  t.pass();
});

test('SignalDefinition Args type safety', (t) => {
  const signalString = defineSignal<[string]>('a');
  const signalNumber = defineSignal<[number]>('b');

  type TypeAssertion = typeof signalNumber extends typeof signalString ? 'intermixable' : 'not-intermixable';

  const _assertion: TypeAssertion = 'not-intermixable';
  t.pass();
});

test('QueryDefinition Name type safety', (t) => {
  // @ts-expect-error Assert expect a type error when generic and concrete names do not match
  defineQuery<void, [string], 'mismatch'>('illegal value');

  const queryA = defineQuery<void, [string], 'a'>('a');
  const queryB = defineQuery<void, [string], 'b'>('b');

  type TypeAssertion = typeof queryB extends typeof queryA ? 'intermixable' : 'not-intermixable';

  const _assertion: TypeAssertion = 'not-intermixable';
  t.pass();
});

test('QueryDefinition Args and Ret type safety', (t) => {
  const retVariantA = defineQuery<string>('a');
  const retVariantB = defineQuery<number>('b');

  type RetTypeAssertion = typeof retVariantB extends typeof retVariantA ? 'intermixable' : 'not-intermixable';

  const _retAssertion: RetTypeAssertion = 'not-intermixable';

  const argVariantA = defineQuery<string, [number]>('a');
  const argVariantB = defineQuery<string, [string]>('b');

  type ArgTypeAssertion = typeof argVariantB extends typeof argVariantA ? 'intermixable' : 'not-intermixable';

  const _argAssertion: ArgTypeAssertion = 'not-intermixable';
  t.pass();
});