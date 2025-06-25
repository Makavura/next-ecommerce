### Setup Instructions

> With access to the repo, follow the steps below to setup. Please note that the project has been developed using node version 22, if you do not have node setup, you can use [nvm](https://github.com/nvm-sh/nvm), follow their instructions and you should be good to go!

`git clone https://github.com/Makavura/next-ecommerce.git`

`cd next-ecommerce`

`npm install`

`npm run build`

`npm run serve`

### Features implemented
> From the challenge document shared, the below requirements have been implemented on the platform.

> Demo video: A brief introduction on some of the features present, not all features covered.

> For a comprehensive listing of development work, please checkout the breakdown of it in a [Github Project](Github Project) _PS: You should have access to it if you have access to this repository._

> The development was broken down into milestones which contained issues that were later incrementally developed using agile workflow.
![image](https://github.com/user-attachments/assets/689920fc-b674-4fd3-a872-6618ede65b47)

To follow the timeline of development, checkout the PRs listed [here](https://github.com/Makavura/next-ecommerce/pulls?q=is%3Apr+is%3Aclosed)

- ✅ Product listing page
- ✅ Product detail pages
- ✅ Cart - add product to cart
- ✅ Shopping cart page - view items on cart
- ✅ Product search and category filtering (drop-down or tag (multiple) select)
- ✅ Mock UI payment simulation - add shipping information, payment details to complete purchase
- ✅ Persistent cart (multiple tabs)
- ✅ Pagination
- ✅ Unit tests for cart logic and product components
    - ✅  Generate mock product data & write to JSON when performing `SSG`
    - ✅  Setup unit tests for:
        - ✅  Cart context: 
            - ✅  Initialize with an empty cart if `localStorage` is empty
            - ✅  Load cart from `localStorage` on initial render
            - ✅  Add an item to the cart 
            - ✅  Increase quantity if item already in cart
            - ✅  Add a new item and keep existing items 
            - ✅  Remove an item from the cart
            - ✅  Update an item's quantity in the cart
            - ✅  Clear the cart
            - ✅  Update cart when `localStorage` changes from another window/tab 
            - ✅  Throw an error if `useCart` is not used within a `CartProvider` 
            - ✅  Do not add item if quantity is zero or less
        - ✅  Components
            - ✅  `CartItem`
            - ✅  `RootNavBar`
            - ✅  `ProductCard`
            - ✅  `ExternalImage`
            - ✅  `ProductItemCard`
    - ✅  Mock local storage
- ✅ Dynamic data handling
- ✅ Responsive UI/UX (Tab & Mobile tested)
- ✅ State management using Context of cart and favorites
- ✅ Static Site Generation


Routes:
- cart
- products
- checkout
- auth/signin
- auth/signup


> Demo: View a quick demo of the application via: https://www.loom.com/share/a601239ecfd8461b90a631bba23a1a9d?sid=62087a2f-8dcc-490d-88aa-1325d57be06b


> Demo link: the project has been hosted on firebase, leveraging their experimental app hosting feature: View and test the project [here](https://next-ecommerce-mk.web.app/)


### Deployment instructions:

> Deploy on firebase

Install `firebase-tools`:

`npm install -g firebase-tools`

Log in:

`firebase login`

Enable experimental web frameworks:

`firebase experiments:enable webframeworks`

Initialize firebase:

`firebase init`

Serve static content:

`firebase deploy`


> Design Guidelines. In a bid to keep the UI/UX consistent across all pages, I did some minor design work to set the pace. You can preview them via the link provided below.

Link: [Preview](https://www.figma.com/design/15YlX8v6Bfx0Q5vK4nuMN5/E-Commerce-StoreFront?node-id=0-1&p=f)

![image](https://github.com/user-attachments/assets/dd1dcbc7-2c47-4ea1-9520-600353b0455e)

