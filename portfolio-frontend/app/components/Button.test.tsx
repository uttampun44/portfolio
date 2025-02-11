import {render, screen} from '@testing-library/react';
import Button from './Button';
import { describe, it, expect } from 'vitest';
import "@testing-library/jest-dom";

// render the button component and test its functionality using the testing library
describe('Button', () => {
  it('should render button', () => {
    render(<Button>Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
});