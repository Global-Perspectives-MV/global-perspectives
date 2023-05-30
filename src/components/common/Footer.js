import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';

export const Footer = () => {
  return (
    <MDBFooter bgColor="dark" className="text-center text-lg-left">
      <div
        className="text-center p-3"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
      >
        <p className="text-light">
          &copy; {new Date().getFullYear()} Copyright: Global Perspectives
        </p>
      </div>
    </MDBFooter>
  );
};
