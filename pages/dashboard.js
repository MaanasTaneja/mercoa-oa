import { MercoaSession, Invoice, EntityOnboarding, Payables, PayableDetails } from '@mercoa/react';
import { useState } from 'react';

export async function getServerSideProps(context) {
  const { token, entityId } = context.query;

  if (!token || !entityId) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { token, entityId },
  };
}

export default function Onboard({ token, entityId }) {
  const [enableInvoiceCreation, setEnableInvoiceCreation] = useState(false);

  return (
    <div className="bg-white text-black p-4 h-screen overflow-auto">
      {!token && <h1 className="text-red-600">Error Retrieving Token!</h1>}
      <MercoaSession token={token}>
        <div className="flex flex-row gap-4">
          {/* Payables Panel */}
          <div className={`p-4 bg-gray-50 rounded-lg shadow overflow-auto ${enableInvoiceCreation ? 'w-full md:w-1/2' : 'w-full'}`}>
            <h2 className="text-xl font-semibold mb-2">Payables</h2>
            <Payables
              handlers={{
                onCreateInvoice: () => {
                  console.log("Add Invoice Button Clicked");
                  setEnableInvoiceCreation(true);
                },
              }}
            />
          </div>

          {enableInvoiceCreation && (
            <div className="w-full p-4 bg-gray-100 rounded-lg shadow max-h-screen ">
              <h2 className="text-xl font-semibold mb-2">Invoice Details</h2>
              <PayableDetails
                queryOptions={{ invoiceId: '', invoiceType: 'invoice' }}
                handlers={{
                  onInvoiceUpdate: (invoice) => {
                    console.log("Invoice Updated:", invoice);
                    setEnableInvoiceCreation(false);
                  },
                }}
              />
            </div>
          )}
        </div>
      </MercoaSession>
    </div>
  );
}
