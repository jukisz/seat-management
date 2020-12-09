import HomePage from "../components/Pages/home-page";
import NewPersonPage from '../components/Pages/new-person-page';
import PersonListPage from '../components/Pages/person-list-page';
import PersonsPage from '../components/Pages/persons-page';
import ReportsPage from '../components/Pages/reports-page';
import FloorPlanPage from '../components/Pages/floor-plan-page';
import RequestsPage from '../components/Pages/requests-page';
import NewRequestPage from '../components/Pages/new-request-page';
import RequestListPage from '../components/Pages/request-list-page';


export const routes = [
  {
    name: "HomePage",
    path: "/",
    icon: "home",
    title: "Home",
    component: HomePage,
    onNavBar: true
  },

  {
    name: "FloorPlanPage",
    path: "/floor-plans",
    icon: "table",
    title: "Floor Plans",
    component: FloorPlanPage,
    onNavBar: true,
    children: []
  },


  {
    name: "PersonsPage",
    path: "/people",
    icon: "user-friends",
    title: "People",
    component: PersonsPage,
    onNavBar: true,
    children: [
      {
        name: "NewPersonPage",
        path: "/new-person",
        icon: "user-friends",
        title: "New Person",
        component: NewPersonPage,
        onNavBar: true,
        props: true,
      },
      {
        name: "EditPersonPage",
        path: "/edit-person",
        icon: "user-friends",
        title: "Edit Person",
        component: NewPersonPage,
        props: true
      },
      {
        name: "PersonListPage",
        path: "/all-people",
        icon: "user-friends",
        title: "All People",
        component: PersonListPage,
        onNavBar: true,
        props: true
      },
    ]
  },

  {
    name: "Requests",
    path: "/requests",
    icon: "chair",
    title: "Requests",
    component: RequestsPage,
    onNavBar: true,
    children: [
      {
        name: "NewRequestPage",
        path: "/new-request",
        icon: "chair",
        title: "New Request",
        component: NewRequestPage,
        onNavBar: true,
        props: true
      },
      {
        name: "EditRequestPage",
        path: "/edit-request",
        icon: "chair",
        title: "Edit Request",
        component: NewRequestPage,
        props: true
      },
      {
        name: "RequestListPage",
        path: "/all-requests",
        icon: "chair",
        title: "All Requests",
        component: RequestListPage,
        onNavBar: true,
        props: true
      },
    ]
  },

  {
    name: "ReportsPage",
    path: "/reports",
    icon: "chart-bar",
    title: "Reports",
    component: ReportsPage,
    onNavBar: true,
    children: []
  },



];
