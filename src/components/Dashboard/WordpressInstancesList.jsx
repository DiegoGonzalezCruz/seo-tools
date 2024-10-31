import { useMutation, useQueryClient } from '@tanstack/react-query'

import toast from 'react-hot-toast'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const WordpressInstancesList = ({ userData }) => {
  const queryClient = useQueryClient()

  const { wordpressInstances } = userData
  // console.log(wordpressInstances, 'wordpressInstances')

  const setAsActiveMutation = useMutation({
    mutationFn: async (instance) => {
      const response = await fetch('/api/wordpressInstances', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          wpSiteURL: instance.url,
          wpPassword: instance.appPassword,
          userId: instance.userId,
          wpUsername: instance.appUsername,
          isActive: true,
        }),
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', userData.id] })
      toast.success('Instance set as active successfully')
    },
    onError: (error) => {
      toast.error('Error setting instance as active: ' + error.message)
    },
  })

  const deleteInstanceMutation = useMutation({
    mutationFn: async (instance) => {
      const response = await fetch('/api/wordpressInstances', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          wpSiteURL: instance.url,
          userId: instance.userId,
        }),
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', userData.id] })
      toast.success('Instance deleted successfully')
    },
    onError: (error) => {
      toast.error('Error deleting instance: ' + error.message)
    },
  })

  return (
    <div className="flex flex-wrap gap-10 items-center justify-center my-20">
      {wordpressInstances
        .sort((a, b) => b.isActive - a.isActive)
        .map((instance, index) => {
          // console.log(instance, 'instance')
          return (
            <Card key={instance.url} className=" ">
              <CardHeader className="card-body p-5">
                <CardTitle className="card-title text-base">
                  {instance.url}
                </CardTitle>
                <CardDescription>
                  {instance.appUsername}
                  <br />
                  {instance.appPassword}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!instance.isActive ? (
                  <Badge variant="inactive" className="">
                    inactive
                  </Badge>
                ) : (
                  <Badge variant="active" className="badge badge-primary">
                    active
                  </Badge>
                )}
              </CardContent>

              <CardFooter className=" flex flex-row gap-5 items-center justify-center">
                <Button onClick={() => setAsActiveMutation.mutate(instance)}>
                  Set as Active
                </Button>

                <Button
                  variant="destructive"
                  onClick={() => deleteInstanceMutation.mutate(instance)}
                >
                  Delete
                </Button>
              </CardFooter>
            </Card>
          )
        })}
    </div>
  )
}

export default WordpressInstancesList
