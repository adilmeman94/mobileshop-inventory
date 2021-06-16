'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

/* render welcome page in view */

Route.on('/').render('welcome')

/* auth Routes */

Route.post('users/register', 'UserController.register').validator('AuthValidator/ValidateUser')
Route.post('users/login', 'UserController.login').validator('AuthValidator/ValidateLogin')
Route.get('users/list', 'UserController.list').middleware('auth')
Route.get('users/profile', 'UserController.profile').middleware('auth')
Route.put('users/changePassword', 'UserController.changePassword').middleware('auth').validator('AuthValidator/ValidateChangePassword')
Route.post('users/logout/:refreshToken', 'UserController.logout').middleware('auth')
Route.put('users/updateProfile', 'UserController.updateProfile').middleware('auth').validator('AuthValidator/ValidateProfile')
Route.post('users/forgotPassword', 'UserController.forgotPassword').validator('AuthValidator/ValidateForgotPassword')
Route.put('users/resetPassword/:token/:email', "UserController.resetPassword")

/* category Routes */
Route.post('/categories', 'CategoryController.createCategory').middleware('auth').validator('CategoryValidator/ValidateCategory')
Route.get('/categories', 'CategoryController.listCategory').middleware('auth')
Route.get('/categories/:id', 'CategoryController.categoryById').middleware('auth')
Route.put('/categories/:id', 'CategoryController.editCategory').middleware('auth').validator('CategoryValidator/ValidateCategory')
Route.delete('/categories/:id', 'CategoryController.deleteCategory').middleware('auth')

/* products Routes */
Route.post('/products', 'ProductController.createProducts').middleware('auth').validator('ProductValidator/ValidateProduct')
Route.get('/products', 'ProductController.listProducts').middleware('auth')
Route.get('/products/:id', 'ProductController.productById').middleware('auth')
Route.put('/products/:id', 'ProductController.editProduct').middleware('auth').validator('ProductValidator/ValidateProduct')
Route.delete('/products/:id', 'ProductController.deleteProduct').middleware('auth')

/* store Routes */
Route.post('/stores', 'StoreController.createStore').middleware('auth').validator('StoreValidator/ValidateStore')
Route.get('/stores', 'StoreController.listStore').middleware('auth')
Route.get('/stores/:id', 'StoreController.storeById').middleware('auth')
Route.put('/stores/:id', 'StoreController.editStore').middleware('auth').validator('StoreValidator/ValidateStore')
Route.delete('/stores/:id', 'StoreController.deleteStore').middleware('auth')

/* complaints Routes */
Route.post('/complaints', 'ComplaintController.createComplaint').middleware('auth').validator('ComplaintValidator/ValidateComplaint')
Route.get('/complaints', 'ComplaintController.listComplaint').middleware('auth')
Route.get('/complaints/:id', 'ComplaintController.complaintById').middleware('auth')
Route.put('/complaints/:id', 'ComplaintController.editComplaint').middleware('auth').validator('ComplaintValidator/ValidateComplaint')
Route.delete('/complaints/:id', 'ComplaintController.deleteComplaint').middleware('auth')

/* purchase Routes */
Route.post('/purchases', 'PurchaseController.createPurchase').middleware('auth')
Route.get('/purchases', 'PurchaseController.listPurchase').middleware('auth')
Route.get('/purchases/:id', 'PurchaseController.purchaseById').middleware('auth')
Route.put('/purchases/:id', 'PurchaseController.editPurchase').middleware('auth')
Route.delete('/purchases/:id', 'PurchaseController.deletePurchase').middleware('auth')

/* sell Routes */
Route.post('/sells', 'SellController.createSell').middleware('auth')
Route.get('/sells', 'SellController.listSell').middleware('auth')
Route.get('/sells/:id', 'SellController.sellById').middleware('auth')
Route.put('/sells/:id', 'SellController.editSell').middleware('auth')
Route.delete('/sells/:id', 'SellController.deleteSell').middleware('auth')





