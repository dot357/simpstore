import {  afterEach } from 'vitest'

// Any additional setup code can go here
afterEach(() => {
  // Clean up after each test
  localStorage.clear();
});