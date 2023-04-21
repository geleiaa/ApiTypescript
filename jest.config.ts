import { resolve } from 'path';
const root = resolve(__dirname);

import { pathsToModuleNameMapper } from 'ts-jest/dist';
import { compilerOptions } from './tsconfig.json';

export default {
  rootDir: root,
  displayName: 'funct-tests',
  testMatch: ['<rootDir>/tests/**/*.test.ts'],
  testEnvironment: 'node',
  clearMocks: true,
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/tests/jest-setup.ts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  // moduleNameMapper: {
  //     '@src/(.*)': '<rootDir>/src/$1',
  //     '@test/(.*)': '<rootDir>/test/$1',
  // },
};

//config para testes unitarios
