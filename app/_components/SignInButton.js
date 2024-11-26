import { signInAction } from '../_lib/actions';

// We need interactivity in this component and keep the login flow in the server, so a form is used to run the signin request in the server using an action.
function SignInButton() {
  return (
    <form action={signInAction}>
      <button className='flex items-center gap-6 px-10 py-4 text-lg font-medium border border-primary-300'>
        <img
          src='https://authjs.dev/img/providers/google.svg'
          alt='Google logo'
          height='24'
          width='24'
        />
        <span>Continue with Google</span>
      </button>
    </form>
  );
}

export default SignInButton;
