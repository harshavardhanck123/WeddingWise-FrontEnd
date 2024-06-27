import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import vendorServices from '../../services/vendorServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import '../../styles/VendorDetail.css'; // Import CSS file for custom styling

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
    return <p className="text-center mt-4">Loading vendor details...</p>;
  }

  if (!vendor) {
    return <p className="text-center mt-4">Vendor details not found.</p>;
  }

  return (
    <div className="vendor-details-container">
      <h2 className="vendor-name">{vendor.name}</h2>
      <div className="vendor-info">
        <p>
          <FontAwesomeIcon icon={faPhone} className="icon" />
          <strong>Phone:</strong> {vendor.contactDetails.phone}
        </p>
        <p>
          <FontAwesomeIcon icon={faEnvelope} className="icon" />
          <strong>Email:</strong> {vendor.contactDetails.email}
        </p>
        {/* Add more details as needed */}
      </div>
    </div>
  );
};

export default VendorDetail;
