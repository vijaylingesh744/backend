import React, {useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './Components/ReUsable/header.js';
import Dashboard from './Components/ReUsable/Dashboard.js';
import Commerce from './Components/Dashboard/Commerce.js';
import BPSidebar from './Components/ReUsable/BPSidebar.js';
import CSVault from './Components/Screens/CsVault';
import Home from './Components/Screens/Home.js';
import Community from './Components/Screens/Communty.js';
import Transaction from './Components/Screens/Transaction.js';
import Chats from './Components/Screens/MyProject/Chats.js';
import Mysales from './Components/Screens/Mysales.js';
import Settings from './Components/Screens/AccountSetting.js';
import Terms from './Components/Screens/Terms.js';
import Maintain from './Components/Screens/Maintain.js';
import Mypurchase from './Components/Screens/Mypurchase.js';
import Product from './Components/Screens/MyProject/Index.js';
import Eaggrement from './Components/Screens/Eaggrement.js';
import BankPayment from './Components/Screens/BankPayment.js';
import Payment from './Components/Screens/Payment.js';
import Calender from './Components/Screens/Calender/CalenderOne.js';
import AllJobs from './Components/Screens/All-Jobs.js';
import General from './Components/Dashboard/General.js';
import Kanban from './Components/Dashboard/Kanban.js';
import Email from './Components/Dashboard/Email.js';
import Notes from './Components/Dashboard/Notes.js';
import Contact from './Components/Dashboard/Contact.js';
import Contact2 from './Components/Dashboard/Contact2.js';
import Invoice from './Components/Dashboard/Invoice.js';
import User from './Components/Dashboard/User.js';
import Blog_post from './Components/Dashboard/Blog_post.js';
import Blog_details from './Components/Dashboard/Blog_details.js';
import Eco_shop from './Components/Dashboard/Eco_shop.js';
import Eco_details from './Components/Dashboard/Eco_details.js';
import Member from './Components/Dashboard/Member.js';
import Projects from './Components/Screens/MyProject/Index.js';
import ClientList from './Components/Screens/user/AddClient.js';
import { UserProvider, useUserContext } from './Components/ReUsable/Context.js';
import Userlist from './Components/Screens/user/Userlist.js';
import Industries from './Components/Screens/industry/Industry.js';
import Post from './Components/Screens/Post/Post.js';
import Login from './Components/ClientAuth/Login.js';
import Register from './Components/ClientAuth/Register.js';
import Alldetails from './Components/Screens/Details/Alldetails.js';
import Subcribe from './Components/Screens/subscription/Subcribe.js';
import Tag from './Components/Screens/Tags/Tag.js';
import Coupon from './Components/Screens/Coupon/Coupon.js';
import Pavilion from './Components/Screens/pavilion/Pavilion.js';
import PavilionStatic from './Components/Screens/pavilion/Demo.js';
import Skills from './Components/Screens/Skills/Skills.js';
import Lead from './Components/Screens/user/AddUser.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Notification from './Components/Screens/Notification/Notification.js';
import Invoice1 from './Components/Screens/MyProject/Invoice.js';
import Progress from './Components/Screens/Calender/Process.js';
import AggrementView from './Components/Screens/Notification/Preview.js';
import Bussinesscommunity from './Components/Screens/Bussinesscommunity/Bussinesscommunity.js';
import Chatgroup from './Components/Screens/Bussinesscommunity/Chatgroup.js';
import GICTCode from './Components/Screens/GICTCode/Index.js';


function App() {
  const AdminroutesArray = [
    { path: "/", element: <Dashboard /> },
    { path: "/eCommerce", element: <Commerce /> },
    { path: "/General", element: <General /> }, 
    { path: "/Calender", element: <Calender /> },
    { path: "/Kanban", element: <Kanban /> },
    { path: "/app-email", element: <Email /> },
    { path: "/app-notes", element: <Notes /> },
    { path: "/app-contact", element: <Contact /> },
    { path: "/app-contact2", element: <Contact2 /> },
    { path: "/support", element: <Community /> },
    { path: "/transaction", element: <Transaction /> },
    { path: "/chat/:id", element: <Chats /> },
    { path: "/my-sales", element: <Mysales /> },
    { path: "/app-Invoice", element: <Invoice /> },
    { path: "/app-user", element: <User /> },
    { path: "/blog_post", element: <Blog_post /> },
    { path: "/Blog_details", element: <Blog_details /> },
    { path: "/eco-shop", element: <Eco_shop /> },
    { path: "/eco-shop-details", element: <Eco_details /> },
    { path: "/Product", element: <Product /> },
    { path: "/app-member", element: <Member /> },
    { path: "/app-product", element: <Product /> },
    { path: "/cs-vault", element: <CSVault /> },
    { path: "/users", element: <Userlist /> },
    { path: "/home", element: <Home /> },
    { path: "/settings", element: <Settings /> },
    { path: "/terms", element: <Terms /> },
    { path: "/maintain", element: <Maintain /> },
    { path: "/e-aggrement", element: <Eaggrement /> },
    { path: "/my-purchase", element: <Mypurchase /> },
    { path: "/my-project", element: <Projects /> },
    { path: "/bank-payment", element: <BankPayment /> },
    { path: "/payment", element: <Payment /> },
    { path: "/all-jobs", element: <AllJobs /> },
    { path: "/industry", element: <Industries /> },
    { path: "/post", element: <Post /> },
    { path: "/login", element: <Login/> },
    { path: "/registers", element: <Register/> },
    { path: "/alldetails/:id", element: <Alldetails /> },
    { path: "/subscriptions", element: <Subcribe /> },
    { path: "/tags", element: <Tag /> },
    { path: "/coupon", element: <Coupon /> },
    { path: "/pavilion", element: <Pavilion /> },
    { path: "/pavilion-cate", element: <PavilionStatic /> },
    { path: "/client", element: <ClientList /> },
    { path: "/skills", element: <Skills /> },
    { path: "/lead", element: <Lead /> },
    { path: "/notification", element:<Notification /> },
    { path: "/project-invoice", element:<Invoice1 /> },
    { path: "/project-connection/:id", element:<Chats /> },
    { path: "/progress", element:<Progress /> },
    { path: "/preview", element:<AggrementView /> },
    { path: "/businesscommunity", element:<Bussinesscommunity /> },
    { path: "/chatgroup", element:<Chatgroup /> },
    { path: "/g_code", element:<GICTCode /> },
  ];

  const AdminRoute = AdminroutesArray.map((route) => (
    <Route key={route.path} path={route.path} element={route.element} />
  ));

  const path = window.location.pathname;
  const RouterHere = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const user_id = urlParams.get('user_id');
    useEffect(() => {
      if(user_id){
      }else if (JSON.parse(localStorage.getItem('User')) === null && (path != '/home' && path != '/login' && path != '/step1')) {
        window.location.href='/login'
      }
    }, []);

    
    return(
      <div>
        <div id={path != '/login' && "main-wrapper"}>
        {path != '/login' && <BPSidebar />}
          <div className={path != '/login' && "page-wrapper"}>
          {path != '/login' && <Header />}
            <ToastContainer />
            <Routes>
              {AdminRoute}
            </Routes>
          </div>
        </div>
      </div>
    )
  }
  return (
    <Router>
      <UserProvider>
        <RouterHere />
      </UserProvider>
    </Router>
  );
}

export default App;
