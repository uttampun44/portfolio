import Card from "./Card"
import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import "@testing-library/jest-dom"

describe('Card', () =>{
    it('should render card', () =>{
        render(<Card>Card</Card>)
        const card = screen.getByRole('region')
        expect(card).toBeInTheDocument()
    })
})