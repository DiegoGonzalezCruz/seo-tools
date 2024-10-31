import ConfigurationDashboard from './ConfigurationDashboard'

const WPConfigDashboard = () => {
  return (
    <>
      <div className="md:w-5/6 w-full p-5 h-full ">
        <div className="w-full h-ful flex flex-col items-center justify-center gap-5 py-10 ">
          <h1 className="text-5xl font-bold">Alt Tagger</h1>
          <p className="">
            This app retrieves the media from a Wordpress REST API, analyzes the
            information from it.
          </p>
          <ConfigurationDashboard />
        </div>
      </div>
    </>
  )
}

export default WPConfigDashboard
