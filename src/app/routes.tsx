import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { ROUT_PAGE_NAME } from 'common';

const AllBooks = lazy(() => import('components/books/allBooks'));
const Login = lazy(() => import('components/account/login'));
const Registration = lazy(() => import('components/account/registration'));
const AllCurUserActiveBooks = lazy(() => import('components/activeBook/allActiveBooks'));
const AdministrationMain = lazy(() => import('components/administration'));
const Profile = lazy(() => import('components/account/profile'));
const ActiveBooksStatistic = lazy(() => import('components/activeBooksStatistic'));
const AllUsers = lazy(() => import('components/users/allUsers'));
const BookInfo = lazy(() => import('components/books/bookInfo'));

export const appRoutes = [
  { path: ROUT_PAGE_NAME.ALL_BOOKS, element: <AllBooks /> },
  { path: ROUT_PAGE_NAME.USER_LOGIN, element: <Login /> },
  { path: ROUT_PAGE_NAME.USER_REGISTRATION, element: <Registration /> },
  { path: ROUT_PAGE_NAME.ALL_ACTIVE_BOOKS, element: <AllCurUserActiveBooks /> },
  { path: ROUT_PAGE_NAME.ADMINISTRATION, element: <AdministrationMain /> },
  { path: ROUT_PAGE_NAME.USER_PROFILE, element: <Profile /> },
  { path: ROUT_PAGE_NAME.ACTIVE_BOOK_STATISTIC, element: <ActiveBooksStatistic /> },
  { path: ROUT_PAGE_NAME.ALL_USERS, element: <AllUsers /> },
  { path: ROUT_PAGE_NAME.BOOK_INFO, element: <BookInfo /> },
  { path: '/', element: <Navigate to={ROUT_PAGE_NAME.ALL_BOOKS} replace /> },
  { path: '*', element: <Navigate to={ROUT_PAGE_NAME.ALL_BOOKS} replace /> },
];
