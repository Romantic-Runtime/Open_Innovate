import { useNavigate } from 'react-router-dom'
import GlareHover from '../components/GlareHover'

const LandingPage = () => {
  const navigate = useNavigate()

  return (
    <>
   {/* <div className="min-h-screen bg-[#090909] text-white font-[Montserrat]">
      
      <header className="flex justify-between items-center p-6 px-12 fixed top-0 left-0 right-0 bg-[rgba(0,0,0,0.9)] backdrop-blur-md z-50 border-b border-[rgba(127,255,0,0.1)]">
        <div className="text-2xl font-semibold cursor-pointer">
          <span className="text-white">Open</span>
          <span className="text-[#7FFF00]">Innovate</span>
        </div>
        <div className="flex gap-4">
          <button 
            className="px-7 py-3 bg-transparent text-white border border-[#7FFF00] rounded-lg text-sm font-medium hover:bg-[rgba(127,255,0,0.1)] transition-all duration-300 hover:-translate-y-0.5" 
            onClick={() => navigate('/login')}
          >
            Log in
          </button>
          <button 
            className="px-7 py-3 bg-[#7FFF00] text-black rounded-lg text-sm font-semibold hover:bg-[#6FEF00] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(127,255,0,0.3)]" 
            onClick={() => navigate('/signup')}
          >
            Register
          </button>
        </div>
      </header> */}
     <div className=" bg-linear-to-b from-[#090909] from-50% to-[#3ED194] min-h-screen min-w-screen ">
        <div className="h-screen min-w-screen max-h-[80vh] bg-[#090909] rounded-b-full blur-[90px] "></div>
        <div className="bg-linear-to-br from-[#000000] to-[#3CC88E] p-[2.5px] rounded-[48px] w-screen max-w-270 left-30 absolute top-10 ">
          <nav>
          <div className="bg-[#000000]/90 flex flex-row justify-between rounded-[48px] p-3">
            <h1 className="text-amber-50 relative left-20"><span className="text-green-500 font-bold relative left-2 font-[Young Serif] text-2xl">Open</span> <br></br><span className="font-bold font-[Young Serif] text-xl">Innovate</span></h1>
             <div className="bg-linear-to-b from-[#51D685] to-[#B5F415] rounded-4xl ml-175 flex items-center justify-center p-0.5 relative top-2 h-fit">
             <button  onClick={() => navigate("/login")} className="text-amber-50 rounded-4xl bg-[#090909] px-5 py-2 ">Login</button>
            </div>
            <button onClick={() => navigate("/signup")} className="text-black font-bold rounded-4xl h-fit p-2.5 relative right-8 top-2 bg-linear-to-b from-[#41D195] to-[#C9FF05]">Register</button>
          </div>
          </nav>
        </div>
         {/* <section className="min-h-screen flex flex-col items-center justify-center pt-20 px-12 gap-8">
        <div className="text-center max-w-4xl">
          <h1 className="text-5xl font-normal mb-4">
            Turn your big idea into real-world <span className="text-[#7FFF00]">Innovation</span>
            <br />
            with Right People
          </h1>
          <p className="text-lg text-gray-300 mb-8">
            Register your projects to build a perfect team or join existing to become a perfect team
          </p>
          <div className="flex gap-4 justify-center">
            <button 
              className="bg-gradient-to-b from-[#51D685] to-[#B5F415] px-6 py-3 rounded-full text-black font-bold text-lg hover:-translate-y-1 transition-all duration-300" 
              onClick={() => navigate('/signup')}
            >
              Register Your Project
            </button>
            <div className="bg-gradient-to-b from-[#51D685] to-[#B5F415] p-0.5 rounded-full">
              <button 
                className="text-amber-50 rounded-full bg-[#090909] px-7 py-3 font-bold hover:-translate-y-1 transition-all duration-300" 
                onClick={() => navigate('/signup')}
              >
                Join a Project
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex gap-7 items-center justify-center pb-10">
          <GlareHover
            glareColor="#36b274"
            glareOpacity={0.6}
            glareAngle={-45}
            glareSize={400}
            transitionDuration={1000}
            playOnce={false}
            width='350px'
            height='230px'
            background=""
            className="rotate-12 hover:cursor-default shadow-2xl shadow-[#3DCA86] bg-linear-to-br from-[#082B1F] via-[#0D492C] to-[#021D11]"
          />
          <GlareHover
            glareColor="#36b274"
            glareOpacity={0.6}
            glareAngle={-45}
            glareSize={400}
            transitionDuration={1000}
            playOnce={false}
            background=""
            width="436px"
            height="320px"
            className="shadow-2xl hover:cursor-default shadow-[#3DCA86] bg-linear-to-br from-[#000000] via-[#0D492C] to-[#000000]"
          />
          <GlareHover
            glareColor="#36b274"
            glareOpacity={0.6}
            glareAngle={-45}
            glareSize={400}
            transitionDuration={1000}
            playOnce={false}
            background=""
            className="-rotate-12 hover:cursor-default shadow-2xl shadow-[#3DCA86] bg-linear-to-br from-[#082B1F] via-[#245A42] to-[#021D11]"
            height="230px"
            width="350px"
          />
        </div>
      </section> */}
      <div className="font-[Montserrat] flex flex-col items-center justify-center font-normal text-white absolute top-50 left-80">
          <h1 className="text-center text-4xl">Turn your big idea into real-world Innovation<br></br> with Right People</h1>
          <h1>Register your projects to build a perfect team or join existing to become a perfect team</h1>
          <div className="flex flex-row">
            <button onClick={() => navigate('/signup')} className="bg-linear-to-b from-[#51D685] to-[#B5F415] h-fit p-3 relative top-2 m-2 rounded-4xl text-black font-bold text-lg">Register Your Project</button>
            <div className="bg-linear-to-b from-[#51D685] to-[#B5F415] relative top-2 p-0.5 h-fit m-2  rounded-4xl ">
              <button onClick={() => navigate('/signup')} className="text-amber-50 rounded-4xl bg-[#090909] px-7 py-3  font-bold  ">Join a Project </button>
            </div>
          </div>
        </div>
        <div className="relative h-1/2 flex gap-7 items-center justify-center pb-10 ">
          <GlareHover
            glareColor="#36b274"
            glareOpacity={0.6}
            glareAngle={-45}
            glareSize={400}
            transitionDuration={1000}
            playOnce={false}
            width='350px'
            height='230px'
            background=""
            className="rotate-12 hover:cursor-default shadow-2xl/100 shadow-[#3DCA86] bg-linear-[135deg,#082B1F,#021D11_10%,#083325_25%,#0D492C_30%,#245A42_35%,#071C15_55%,#1B4C35_70%,#021D11_100%] "
          />
          <GlareHover
            glareColor="#36b274"
            glareOpacity={0.6}
            glareAngle={-45}
            glareSize={400}
            transitionDuration={1000}
            playOnce={false}
            background=""
            width="436px"
            height="320px"
            className="shadow-2xl/100 hover:cursor-default shadow-[#3DCA86] bg-linear-[135deg,#000000,#021D11_10%,#0D492C_20%,#000000_40%,#071C15_50%,#0D492C_70%,#000000_90%,#021D11_100%]"
          />
          <GlareHover
            glareColor="#36b274"
            glareOpacity={0.6}
            glareAngle={-45}
            glareSize={400}
            transitionDuration={1000}
            playOnce={false}
            background=""
            className="rotate-168 hover:cursor-default shadow-2xl/100 shadow-[#3DCA86] bg-linear-[120deg,#082B1F,#021D11_10%,#083325_25%,#0D492C_30%,#245A42_35%,#071C15_55%,#1B4C35_70%,#021D11_100%]"
            height="230px"
            width="350px"

          />

          {/* </GlareHover> */}
        </div>
        </div>

      {/* Hero Section */}
     

      {/* Features Section */}
      <section className="bg-[#090909] min-h-screen flex flex-col items-center justify-start p-16 gap-8">
        <div className="bg-[#37BC7E] rounded-full p-0.5">
          <button className="bg-[#031D14] rounded-full px-7 font-bold py-1 text-[#F5E9CB]">Key Features</button>
        </div>
        <h1 className="text-white tracking-wider text-5xl text-center">Why Choose <span className="italic">OpenInnovate</span>?</h1>
        <section className="grid grid-cols-4 grid-rows-3 gap-5 pt-5 w-full max-w-7xl">
          <GlareHover
            glareColor="#36b274"
            glareOpacity={0.6}
            glareAngle={-45}
            glareSize={400}
            transitionDuration={1000}
            playOnce={false}
            width=''
            height=''
            background=""
            className="h-auto border-2 hover:cursor-default w-auto bg-linear-to-br from-[#000000] via-[#36B27450] to-[#000000]"
          >
            <div className="p-8 text-center">
              <h3 className="text-xl font-semibold text-[#7FFF00] mb-3">Find Perfect Team Members</h3>
              <p className="text-gray-300">Connect with skilled individuals who share your passion and vision</p>
            </div>
          </GlareHover>
          <GlareHover
            glareColor="#36b274"
            glareOpacity={0.6}
            glareAngle={-45}
            glareSize={400}
            transitionDuration={1000}
            playOnce={false}
            width=''
            height=''
            background=""
            className="h-auto border-2 hover:cursor-default w-auto bg-linear-to-br from-[#000000] via-[#36B27450] to-[#000000]"
          >
            <div className="p-8 text-center">
              <h3 className="text-xl font-semibold text-[#7FFF00] mb-3">Showcase Your Skills</h3>
              <p className="text-gray-300">Join exciting projects and contribute your expertise</p>
            </div>
          </GlareHover>
          <GlareHover
            glareColor="#36b274"
            glareOpacity={0.6}
            glareAngle={-45}
            glareSize={400}
            transitionDuration={1000}
            playOnce={false}
            width=''
            height=''
            background=""
            className="h-auto border-2 hover:cursor-default w-auto col-span-2 row-span-2 bg-linear-to-br from-[#000000] via-[#36B27450] to-[#000000]"
          >
            <div className="p-12 text-center flex flex-col items-center justify-center h-full">
              <h3 className="text-2xl font-semibold text-[#7FFF00] mb-4">Smart Matching</h3>
              <p className="text-gray-300 text-lg">AI-powered matchmaking to find the perfect fit for your project</p>
            </div>
          </GlareHover>
          <GlareHover
            glareColor="#36b274"
            glareOpacity={0.6}
            glareAngle={-45}
            glareSize={400}
            transitionDuration={1000}
            playOnce={false}
            width=''
            height=''
            background=""
            className="col-span-2 hover:cursor-default col-start-1 h-auto border-2 w-auto bg-linear-to-br from-[#000000] via-[#36B27450] to-[#000000]"
          >
            <div className="p-8 text-center">
              <h3 className="text-xl font-semibold text-[#7FFF00] mb-3">Collaborative Workspace</h3>
              <p className="text-gray-300">Manage projects efficiently with built-in collaboration tools</p>
            </div>
          </GlareHover>
          <GlareHover
            glareColor="#36b274"
            glareOpacity={0.6}
            glareAngle={-45}
            glareSize={400}
            transitionDuration={1000}
            playOnce={false}
            width=''
            height=''
            background=""
            className="col-span-2 hover:cursor-default col-start-1 h-auto border-2 w-auto bg-linear-to-br from-[#000000] via-[#36B27450] to-[#000000]"
          >
            <div className="p-8 text-center">
              <h3 className="text-xl font-semibold text-[#7FFF00] mb-3">Secure & Reliable</h3>
              <p className="text-gray-300">Your data and projects are protected with enterprise-grade security</p>
            </div>
          </GlareHover>
          <GlareHover
            glareColor="#36b274"
            glareOpacity={0.6}
            glareAngle={-45}
            glareSize={400}
            transitionDuration={1000}
            playOnce={false}
            width=''
            height=''
            background=""
            className="border-2 hover:cursor-default col-span-2 bg-linear-to-br from-[#000000] via-[#36B27450] to-[#000000]"
          >
            <div className="p-8 text-center">
              <h3 className="text-xl font-semibold text-[#7FFF00] mb-3">Community Driven</h3>
              <p className="text-gray-300">Join a thriving community of innovators and creators</p>
            </div>
          </GlareHover>
        </section>
      </section>

      {/* How It Works Section */}
      <section className="bg-[#090909] min-h-screen flex flex-col items-center justify-start p-16 gap-8">
        <div className="bg-[#37BC7E] rounded-full p-0.5">
          <button className="bg-[#031D14] rounded-full px-7 font-bold py-1 text-[#F5E9CB]">How It Works</button>
        </div>
        <h1 className="text-white tracking-wider text-5xl text-center">Get Started In Simple Steps</h1>
        <section className="grid grid-cols-10 grid-rows-2 gap-5 w-full max-w-7xl">
          <GlareHover
            glareColor="#36b274"
            glareOpacity={0.6}
            glareAngle={-45}
            glareSize={400}
            transitionDuration={1000}
            playOnce={false}
            width=''
            height=""
            background=""
            className="col-span-4 hover:cursor-default h-auto border-2 w-auto bg-linear-to-br from-[#000000] via-[#36B27450] to-[#000000]"
          >
            <div className="p-10 text-center">
              <div className="text-6xl font-bold text-[#7FFF00] mb-4">1</div>
              <h3 className="text-xl font-semibold text-white mb-3">Create Your Profile</h3>
              <p className="text-gray-300">Sign up and tell us about your skills and interests</p>
            </div>
          </GlareHover>
          <GlareHover
            glareColor="#36b274"
            glareOpacity={0.6}
            glareAngle={-45}
            glareSize={400}
            transitionDuration={1000}
            playOnce={false}
            width=''
            height=''
            background=""
            className="col-span-6 hover:cursor-default h-auto border-2 w-auto bg-linear-to-br from-[#000000] via-[#36B27450] to-[#000000]"
          >
            <div className="p-10 text-center">
              <div className="text-6xl font-bold text-[#7FFF00] mb-4">2</div>
              <h3 className="text-xl font-semibold text-white mb-3">Browse or Post Projects</h3>
              <p className="text-gray-300">Explore exciting projects or register your own idea</p>
            </div>
          </GlareHover>
          <GlareHover
            glareColor="#36b274"
            glareOpacity={0.6}
            glareAngle={-45}
            glareSize={400}
            transitionDuration={1000}
            playOnce={false}
            width=''
            height=''
            background=""
            className="col-span-5 hover:cursor-default h-auto border-2 w-auto bg-linear-to-br from-[#000000] via-[#36B27450] to-[#000000]"
          >
            <div className="p-10 text-center">
              <div className="text-6xl font-bold text-[#7FFF00] mb-4">3</div>
              <h3 className="text-xl font-semibold text-white mb-3">Connect & Collaborate</h3>
              <p className="text-gray-300">Match with team members and start building together</p>
            </div>
          </GlareHover>
          <GlareHover
            glareColor="#36b274"
            glareOpacity={0.6}
            glareAngle={-45}
            glareSize={400}
            transitionDuration={1000}
            playOnce={false}
            width=''
            height=''
            background=""
            className="col-span-5 hover:cursor-default h-auto border-2 w-auto bg-linear-to-br from-[#000000] via-[#36B27450] to-[#000000]"
          >
            <div className="p-10 text-center">
              <div className="text-6xl font-bold text-[#7FFF00] mb-4">4</div>
              <h3 className="text-xl font-semibold text-white mb-3">Launch Your Innovation</h3>
              <p className="text-gray-300">Complete your project and bring your idea to life</p>
            </div>
          </GlareHover>
        </section>
      </section>

      {/* Pricing Section */}
      <section className="bg-[#090909] min-h-screen flex flex-col items-center justify-start p-16 gap-8">
        <div className="bg-[#37BC7E] rounded-full p-0.5">
          <button className="bg-[#031D14] rounded-full px-7 font-bold py-1 text-[#F5E9CB]">Pricing</button>
        </div>
        <h1 className="text-white tracking-wider text-5xl text-center">Plans for Everyone</h1>
        <section className="grid grid-cols-3 gap-5 p-2 pr-4 w-full max-w-6xl">
          <GlareHover
            glareColor="#36b274"
            glareOpacity={0.6}
            glareAngle={-45}
            glareSize={400}
            transitionDuration={1000}
            playOnce={false}
            width=''
            height=''
            background=""
            className="hover:cursor-default h-auto border-2 w-auto bg-linear-to-br from-[#000000] via-[#36B27450] to-[#000000]"
          >
            <div className="p-8 flex flex-col h-full">
              <h3 className="text-2xl font-bold text-white mb-4">Free</h3>
              <p className="text-gray-300 mb-6 flex-grow">Our Basic Plan will help you to explore our website for free</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-[#7FFF00]">$100</span>
                <span className="text-gray-400">/week</span>
              </div>
              <button 
                className="w-full py-3 bg-[#7FFF00] text-black rounded-lg font-semibold mb-6 hover:bg-[#6FEF00] transition-all duration-300" 
                onClick={() => navigate('/signup')}
              >
                Get Started →
              </button>
              <ul className="text-gray-300 space-y-2">
                <li>• Limited to one Project</li>
                <li>• Basic features</li>
              </ul>
            </div>
          </GlareHover>
          <GlareHover
            glareColor="#36b274"
            glareOpacity={0.6}
            glareAngle={-45}
            glareSize={400}
            transitionDuration={1000}
            playOnce={false}
            width=''
            height=''
            background=""
            className="hover:cursor-default h-auto border-2 border-[#7FFF00] w-auto bg-linear-to-br from-[#000000] via-[#36B27450] to-[#000000] scale-105"
          >
            <div className="p-8 flex flex-col h-full">
              <h3 className="text-2xl font-bold text-white mb-4">Basic</h3>
              <p className="text-gray-300 mb-6 flex-grow">Perfect for growing teams and serious projects</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-[#7FFF00]">$500</span>
                <span className="text-gray-400">/month</span>
              </div>
              <button 
                className="w-full py-3 bg-[#7FFF00] text-black rounded-lg font-semibold mb-6 hover:bg-[#6FEF00] transition-all duration-300" 
                onClick={() => navigate('/signup')}
              >
                Get Started →
              </button>
              <ul className="text-gray-300 space-y-2">
                <li>• Up to 5 Projects</li>
                <li>• Advanced matching algorithm</li>
                <li>• Priority support</li>
              </ul>
            </div>
          </GlareHover>
          <GlareHover
            glareColor="#36b274"
            glareOpacity={0.6}
            glareAngle={-45}
            glareSize={400}
            transitionDuration={1000}
            playOnce={false}
            width=''
            height=''
            background=""
            className="hover:cursor-default h-auto border-2 w-auto bg-linear-to-br from-[#000000] via-[#36B27450] to-[#000000]"
          >
            <div className="p-8 flex flex-col h-full">
              <h3 className="text-2xl font-bold text-white mb-4">Professional</h3>
              <p className="text-gray-300 mb-6 flex-grow">For enterprises and large-scale innovations</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-[#7FFF00]">$1500</span>
                <span className="text-gray-400">/month</span>
              </div>
              <button 
                className="w-full py-3 bg-[#7FFF00] text-black rounded-lg font-semibold mb-6 hover:bg-[#6FEF00] transition-all duration-300" 
                onClick={() => navigate('/signup')}
              >
                Get Started →
              </button>
              <ul className="text-gray-300 space-y-2">
                <li>• Unlimited Projects</li>
                <li>• Dedicated account manager</li>
                <li>• Custom integrations</li>
              </ul>
            </div>
          </GlareHover>
        </section>
      </section>

      {/* Footer */}
      <footer className="text-center py-12 border-t border-[rgba(127,255,0,0.2)] text-gray-500">
        <p>&copy; 2025 OpenInnovate. All rights reserved.</p>
      </footer>
    </>
  )
}

export default LandingPage
