## Medication Reviews/Side-Effects Application
This project is a web application designed to help users review and report medication side effects. It features guest browsing, user authentication, and role-based permissions for managing medications and reviews.

# Features
1. Guest Browsing
Browse Medications by First Letter: Guests can view medications by selecting an alphabet letter. All medications starting with the selected letter are fetched and displayed. Sample data can be referenced from Drugs.com.
Read Reviews: All guests can read existing reviews without needing to sign in.
2. User Authentication
Signup and Signin: Users need to create an account and sign in to add, update, or delete medications and reviews. Authentication is handled using JWT (JSON Web Token).
3. Medication Management
Add Medications: Logged-in users can add new medications. Only the owner of a medication can update or delete it.
Update/Delete Medications: Medication owners can edit or remove their medications.
4. Review Management
Submit Reviews: Logged-in users can submit reviews for medications.
Update/Delete Reviews: Only the owner of a review can edit or delete their review.

# Application Specifications and Requirements
Login-Based System: The application uses JWT for user authentication. Browsing medications and reading reviews are accessible to guests, while adding, updating, and deleting are restricted to logged-in users.

1. State Management: All component and service state properties are declared as a signal.

2. Lazy Loading: User-protected components are implemented with proper lazy-loading techniques to optimize performance.

3. UI and Styling: The application uses Angular Material to ensure a UI that complies with web standards. Other UI kits are not permitted.

4. Angular Best Practices: The project leverages the latest Angular version features and avoids using any legacy Angular APIs.

5. Forms Handling: The application uses ReactiveFormsModule for form elements, ensuring a data-driven approach. The FormsModule (template-driven) is not used.

