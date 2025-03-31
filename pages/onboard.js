import { MercoaSession, EntityOnboarding } from '@mercoa/react';
import { useRouter } from 'next/router';

export async function getServerSideProps(context) {
  const { token, entityId } = context.query; //extract query parameters from url

  if (!token || !entityId) {
      return {
          redirect: {
              destination: "/login", //redirect if missing parameters
              permanent: false,
          },
      };
    }

  return {
      props: { token, entityId }, //pass data as props to the page
  };
}


export default function Onboard({token, entityId}) {
    const router = useRouter();
    const handleOnboardingComplete = () => {
        router.push(`/dashboard?token=${token}&entityId=${entityId}`);
      };

  return (
     <div className= "mx-20 my-10 bg-white text-black font-arial">
      {!token && <h1>Error Retrieving Token!</h1>}
      <div className="p-10 border-4 border-solid rounded-lg border-gray-400">
      <MercoaSession token={token}>
        <h1 className = "text-xl font-bold">Onboard Your Business</h1>
        <EntityOnboarding entityId={entityId} type="payor" onComplete={handleOnboardingComplete} onError={(error) => console.error('Onboarding Error:', error)} />
      </MercoaSession>
      </div>
    </div>
  );
}
