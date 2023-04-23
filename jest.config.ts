import { Config } from 'jest';

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['src/application/**/*.service.ts'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  rootDir: './',
};

export default config;
