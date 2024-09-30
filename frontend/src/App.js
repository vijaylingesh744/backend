import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css';
import useLocalStorage from './componant/utils/RedirectRoute';
import { Chatpageloader, Notifycard, PageProfile, UpdateProfileShimmer, TwoByOneShimmer } from './componant/screens/layout/Shimmer';


const Forgotpassword = React.lazy(() => import('./componant/screens/newRegister/ForgotPassword'));
const SuggestPage = React.lazy(() => import('./componant/screens/newRegister/SuggestPage'));
const FallLoader = React.lazy(() => import('./componant/utils/Loader'));
const Login = React.lazy(() => import('./componant/screens/newRegister/EmailVerify'));
const FeedPage = React.lazy(() => import('./componant/screens/FeedPage/Index'));
const UserDetail = React.lazy(() => import('./componant/screens/FeedPage/UserDetail/Index'));
const Transaction = React.lazy(() => import('./componant/screens/Transaction/Calender'));
const Progress = React.lazy(() => import('./componant/screens/Transaction/Progress'));
const PersonalInfo = React.lazy(() => import('./componant/screens/newRegister/PersonalInfo'));
const BusiInfo = React.lazy(() => import('./componant/screens/newRegister/BusinessInfo'));
const BankInfo = React.lazy(() => import('./componant/screens/newRegister/BankDetails'));
const License = React.lazy(() => import('./componant/screens/newRegister/VerifybusinessInfo'));
const Otp = React.lazy(() => import('./componant/screens/newRegister/OtpVerify'));
const Chats = React.lazy(() => import('./componant/screens/chatPage/ChatscreenNew'));
const Subscribtion = React.lazy(() => import('./componant/screens/subscription/Subscription'));
const Pavilion = React.lazy(() => import('./componant/screens/Pavilion/Pavilion'));
const HomePage = React.lazy(() => import('./componant/Hpage/Homescreen/Homepage'));
const Agreement = React.lazy(() => import('./componant/screens/Agreement/Agreement'));
const Main = React.lazy(() => import('./componant/screens/Vault/Main'));
const Suggestion = React.lazy(() => import('./componant/screens/mainpage/Mainpage'))
const Notification = React.lazy(() => import('./componant/screens/Notification/index'))
const Profile = React.lazy(() => import('./componant/screens/profile/Profile'))
const UserChat = React.lazy(() => import('./componant/screens/FeedPage/UserDetail/UserChat'))
const Pages = React.lazy(() => import('./componant/screens/Pages/Pages'))
const AddPage = React.lazy(() => import('./componant/screens/Addpage/Addpage'))
const invoice = React.lazy(() => import('./componant/screens/Transaction/Invoice'))
const listpage = React.lazy(() => import('./componant/screens/Pages/ListPage'))
const Connection = React.lazy(() => import('./componant/screens/Connections/Connection'))
const TransModule = React.lazy(() => import('./componant/screens/TransHistory/Index'))
const Searchresults = React.lazy(() => import('./componant/screens/Vault/Searchresults'))
const PostSearch = React.lazy(() => import('./componant/screens/Vault/PostSearch'));

// const FeedPageRL = React.lazy(() => import('./componant/screens/FeedPage-RL/Index'));

// DashBoard
const Calender = React.lazy(() => import('./componant/BPage/Screens/Calender/CalenderOne'));
const BPSidebar = React.lazy(() => import('./componant/BPage/ReUsable/BPSidebar'));
const Header = React.lazy(() => import('./componant/BPage/ReUsable/Header'));
const DashBoard = React.lazy(() => import('./componant/BPage/ReUsable/Dashboard'));
const AddUser = React.lazy(() => import('./componant/BPage/Screens/User/AddUser'));
const CsVault = React.lazy(() => import('./componant/BPage/Screens/CsVault/index'));
const BPNotification = React.lazy(() => import('./componant/BPage/Screens/Notification/Notification'));
const Preview = React.lazy(() => import('./componant/BPage/Screens/Notification/Preview'));
const BPTransation = React.lazy(() => import('./componant/BPage/Screens/Transaction'));
const BPInvoice = React.lazy(() => import('./componant/BPage/Screens/MyProject/Invoice'));
const BPC_Chat = React.lazy(() => import('./componant/BPage/Screens/MyProject/Chats'));
const BPChat = React.lazy(() => import('./componant/BPage/Screens/Bussinesscommunity/Chatgroup'));
const AddBPChat = React.lazy(() => import('./componant/BPage/Screens/Bussinesscommunity/Bussinesscommunity'));
const NewAggrement = React.lazy(() => import('./componant/BPage/Screens/Bussinesscommunity/NewAggrement'));
const BPProgress = React.lazy(() => import('./componant/BPage/Screens/Calender/Process'));
const BPUser = React.lazy(() => import('./componant/BPage/Screens/Details/Alldetails'));
const BpLogin = React.lazy(() => import('./componant/BPage/Screens/ModuleLogin/Emaillogin'));
const BpBusiness = React.lazy(() => import('./componant/BPage/Screens/ModuleLogin/BpBusinesssInfo'));
const BpLicense = React.lazy(() => import('./componant/BPage/Screens/ModuleLogin/BpLicense'));
const BPBankInfo = React.lazy(() => import('./componant/BPage/Screens/ModuleLogin/BpBankInfo'));
const BPOtp = React.lazy(() => import('./componant/BPage/Screens/ModuleLogin/BpOTP'));
const BPPersonal = React.lazy(() => import('./componant/BPage/Screens/ModuleLogin/BpPersonal'));
const BpBusinesspartner = React.lazy(() => import('./componant/BPage/Screens/FindBP/index'));
const BPProfile = React.lazy(() => import('./componant/BPage/Screens/profile/Profile'));
const RecommendConnection = React.lazy(() => import('./componant/screens/Recommendation/RecommendConnection'));
const RecommendPages = React.lazy(() => import('./componant/screens/Recommendation/RecommendPages'));

function App() {
  var [Logindata, setLogindata] = useLocalStorage("LOGINDATA");
  var [VerifyData, setVerifyData] = useLocalStorage("VERIFYDATA");

  const Secure = (Component) => {
    const token = Logindata;
    if (!token?.user?._id) {
      return <Navigate to="/login" />;
    }
    return <Component />;
  };

  const FeedSecure = (Component) => {
    const token = Logindata;
    if (!token) {
      return <Navigate to="/login" />;
    }
    return <Component />;
  };

  const LoginSecure = (Component) => {
    const token = Logindata;
    const verify = VerifyData;
    if (token?.user?._id) {
      return <Navigate to="/feed-page" />;
    }
    else if (verify?._id) {
      return <Navigate to='/personal_info' />;
    }
    return <Component />;
  };
  const RegisterSecure = (Component) => {
    const token = Logindata;
    const verify = VerifyData;
    if (!verify?._id) {
      return <Navigate to="/login" />;
    }
    return <Component />;
  };

  const Dashboard = (Companent) => {
    // const location = useLocation();
    const token = Logindata;
    return (
      <div>
        <div >
          <header id='main-header1' >
            <Header />
          </header>
          <Companent />
        </div>
      </div>
    )
  };

  const InSecure = (Component) => {
    const verifyData = localStorage.getItem("VERIFYDATA");
    if (verifyData) {
      return <Navigate to="/personal_info" />;
    }
    return <Component />;
  };

  const HideHeader = (Companent) => {
    return (
      <div>
        <div >
          <Companent />
        </div>
      </div>
    )
  }


  const routes = [
    { path: '/login', element: LoginSecure(Login) },
    { path: '/', element: <HomePage /> },
    { path: '/payments', element: <TransModule /> },
    { path: '/business-info', element: RegisterSecure(BusiInfo) },
    { path: '/bank_info', element: RegisterSecure(BankInfo) },
    { path: '/personal_info', element: RegisterSecure(PersonalInfo) },
    { path: '/main', element: Secure(Main) },
    { path: '/license', element: RegisterSecure(License) },
    { path: '/notify', element: Secure(Notification) },
    { path: '/user/:id', element: Secure(UserDetail) },
    { path: '/otp/:gmail', element: InSecure(Otp) },
    { path: '/pavilion', element: Secure(Pavilion) },
    { path: '/chats', element: Secure(Chats) },
    { path: '/subscribe', element: Secure(Subscribtion) },
    { path: '/terms/:id', element: Secure(Agreement) },
    { path: '/transactiton', element: Secure(Transaction) },
    { path: '/progress', element: Secure(Progress) },
    { path: '/forgot_password', element: <Forgotpassword /> },
    { path: '/suggestions', element: <Suggestion/> },
    { path: '/profile', element: Secure(Profile) },
    { path: '/feed-page', element: FeedSecure(FeedPage) },
    { path: '/UserChat', element: Secure(UserChat) },
    { path: '/pages/:id', element: FeedSecure(Pages) },
    { path: '/add_page', element: Secure(AddPage) },
    { path: '/invoice', element: Secure(invoice) },
    { path: '/list_page', element: Secure(listpage) },
    { path: '/connections', element: Secure(Connection) },
    { path: '/searchresult', element: Secure(Searchresults) },
    { path: '/suggestpage/:id', element: RegisterSecure(SuggestPage) },
    { path: '/bp/calender', element: Dashboard(Calender) },
    { path: '/bp/dashboard', element: Dashboard(DashBoard) },
    { path: '/bp/user', element: Dashboard(AddUser) },
    { path: '/bp/cs-vault', element: Dashboard(CsVault) },
    { path: '/bp/notification', element: Dashboard(BPNotification) },
    { path: '/transaction', element: Dashboard(BPTransation) },
    { path: '/bp/project-invoice', element: Dashboard(BPInvoice) },
    { path: '/bp/chatgroup', element: Dashboard(BPChat) },
    { path: '/bp/add_chatgroup', element: Dashboard(AddBPChat) },
    { path: '/bp/project-connection', element: Dashboard(BPC_Chat) },
    { path: 'bp/profile', element: Dashboard(BPProfile) },
    { path: '/bp/progress', element: Dashboard(BPProgress) },
    { path: '/bp/preview', element: Dashboard(Preview) },
    { path: '/bp/alldetails/:id', element: Dashboard(BPUser) },
    { path: '/bp/agreement', element: Dashboard(NewAggrement) },
    { path: '/bp/login', element: HideHeader(BpLogin) },
    { path: '/bp/Business-info', element: HideHeader(BpBusiness) },
    { path: '/bp/License', element: HideHeader(BpLicense) },
    { path: '/bp/bank_info', element: HideHeader(BPBankInfo) },
    { path: '/bp/personal_info', element: HideHeader(BPPersonal) },
    { path: '/bp/Otp/:gmail', element: HideHeader(BPOtp) },
    { path: '/bp/find_business', element: Dashboard(BpBusinesspartner) },
    { path: '/recommend-connection', element: FeedSecure(RecommendConnection) },
    { path: '/recommend-pages', element: FeedSecure(RecommendPages) },
    { path: '/post-search', element: FeedSecure(PostSearch) },
    // { path: '/dummy',element: FeedSecure(FeedPageRL)  },
  ];


  const LoaderDash = () => {
    const location = useLocation();

    if (location.pathname == '/feed-page') {
      return <FallLoader />;
    } else if (location.pathname == '/chats') {
      return <Chatpageloader />;
    } else if (location.pathname == '/notify' || location.pathname === '/list_page') {
      return <TwoByOneShimmer />
    } else if (location.pathname == '/pages' || location.pathname.split("/")[1] == 'user') {
      return <TwoByOneShimmer />
    } else if (location.pathname == '/profile') {
      return <TwoByOneShimmer />
    } else if (location.pathname == '/invoice') {
      return <Notifycard />
    } else if (location.pathname == '/main') {
      return <TwoByOneShimmer />
    } else if (location.pathname == '/recommend-pages' || location.pathname == '/recommend-connection') {
      return <TwoByOneShimmer />
    }

    return <FallLoader />;
  };
  return (
    <Router>
      <Suspense fallback={<LoaderDash />}>
        <ToastContainer />
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
