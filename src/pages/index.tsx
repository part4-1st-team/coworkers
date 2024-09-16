import PasswordResetPage from './user/password-reset';
import SignInPage from './auth/signin';

export default function Home() {
  return (
    <div className='overscroll-auto h-500'>
      <PasswordResetPage />
      <SignInPage />
    </div>
  ); // return <main>main page</main>;
}
