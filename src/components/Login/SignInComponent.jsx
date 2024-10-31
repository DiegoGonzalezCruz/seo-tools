import { Button } from '@/components/ui/button'

const SignInComponent = ({ className, redirectTo = '/dashboard' }) => {
  return (
    <form
      className={className}
      action={async () => {
        'use server'
        await signIn('github', { redirectTo })
      }}
    >
      <Button className="btn btn-outline btn-primary" type="submit">
        Signin with Github
      </Button>
    </form>
  )
}

export default SignInComponent
