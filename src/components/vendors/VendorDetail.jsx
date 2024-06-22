import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import vendorServices from '../../services/vendorServices';

const VendorDetail = () => {
  const { id } = useParams();
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchVendorDetails();
  }, []);

  const fetchVendorDetails = async () => {
    try {
      setLoading(true);
      const vendorData = await vendorServices.getVendor(id);
      setVendor(vendorData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching vendor details:', error.message);
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading vendor details...</p>;
  }

  if (!vendor) {
    return <p>Vendor details not found.</p>;
  }

  return (
    <div>
      <p>Name: {vendor.name}</p>
      <p>Service Type: {vendor.serviceType}</p>
      <p>Contact Details: {vendor.contactDetails.phone}, {vendor.contactDetails.email}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default VendorDetail;
