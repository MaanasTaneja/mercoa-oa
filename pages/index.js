import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";

import { MercoaSession, Invoice, EntityOnboarding, Payables } from '@mercoa/react';

/* 
The <Payables> component displays all payables for an entity. It includes built-in filters, 
invoice metrics, and customizable table options. The entity is determined from the JWT token provided to <MercoaSession>.

All components called are under context defined by whichver entity decided to login to their meroca system,
once you llg in you will have your jwt token and the entity id to pass to the componnent that will display yous stuff embedded into the
company website!!! This is so cool actually.
*/

export async function getServerSideProps(context) {
  const { token, entityId } = context.query; //extract query parameters from URL

  if (!token || !entityId) {
      return {
          redirect: {
              destination: "/login", // Redirect if missing parameters
              permanent: false,
          },
      };
  }

  return {
      props: { token, entityId }, // Pass data as props to the page
  };
}


export default function index({token, entityId}) {
  //temp get jwt from dashboard for testing
  // <EntityOnboardingForm entityId={ent_id} /> {/* Onboard a user */}
  return (
     <div className= "m-10 bg-white text-black font-arial">
      <div className="bg-blue-500 text-white p-4">Hello, Tailwind!</div>
      {!token && <h1>Error Retrieving Token!</h1>}

      <MercoaSession token={token}>
      <h1 className = "text-xl font-bold">My Bill Pay App</h1>
      <h2>Payables</h2>
      <Payables />
      <EntityOnboarding entity={entityId} type="payor" />

      </MercoaSession>
    </div>
  );
}
