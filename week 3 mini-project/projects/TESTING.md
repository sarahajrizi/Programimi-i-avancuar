TESTING.md
1. Testing Strategy
We used unit testing with Jest to verify the core functions of the product-catalog-api service. Mock data was used to isolate logic and ensure predictable test results.

2. AI-Assisted Testing Process
AI Tool: ChatGPT
We used prompts like:

“Write a Jest test for getProductById”

“Mock updateProduct and test error handling”

The AI helped generate base test structures quickly, which were then refined manually.
Screenshots of the AI-generated tests:

![alt text](<Screenshot 2025-03-26 213035.png>)

3. Test Coverage Analysis
Command used:

bash
Copy
Edit
npm run test:coverage
Sample result:

product-service.js: 95% lines, 100% functions covered

4. Challenges and Solutions
AI-generated tests sometimes used wrong ID types (number vs string)

Some edge cases (like thrown errors) were not covered
➡️ Manually fixed these by adjusting input types and adding missing test cases.

5. Learnings
AI is great for quickly scaffolding tests, but human review is essential. This process improved my understanding of test coverage, error handling, and best practices in unit testing.