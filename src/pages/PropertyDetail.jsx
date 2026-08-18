import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiMaximize2, FiCalendar, FiGrid, FiBox, FiSmartphone } from 'react-icons/fi';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton } from 'react-share';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { getProperty, createInquiry } from '../api/client';
import { getPropertyById } from '../data/properties';

function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState(() => getPropertyById(id));
  const [inquiry, setInquiry] = useState({ name: '', email: '', message: '' });
  const [inquiryStatus, setInquiryStatus] = useState('');
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  useEffect(() => {
    getProperty(id)
      .then((data) => setProperty(data.property))
      .catch(() => setProperty(getPropertyById(id)));
  }, [id]);

  if (!property) {
    return (
      <div className="min-h-screen bg-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-secondary-600 mb-4">This listing is not available.</p>
          <Link to="/properties" className="btn">Back to properties</Link>
        </div>
      </div>
    );
  }

  const images = property.images?.length ? property.images : [property.image].filter(Boolean);
  const listingAgent = property.agent || {};
  const experiences = property.experiences || [];
  const features = property.features || [];

  const submitInquiry = async (event) => {
    event.preventDefault();
    setInquiryStatus('');
    try {
      await createInquiry({
        propertyId: property.id,
        name: inquiry.name,
        email: inquiry.email,
        message: inquiry.message,
        type: 'walkthrough',
      });
      setInquiry({ name: '', email: '', message: '' });
      setInquiryStatus('Request sent. An agent will follow up.');
    } catch (error) {
      setInquiryStatus(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="bg-white shadow">
        <div className="container py-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-secondary-600 hover:text-primary-600">Home</Link>
            <span className="text-secondary-400">/</span>
            <Link to="/properties" className="text-secondary-600 hover:text-primary-600">Properties</Link>
            <span className="text-secondary-400">/</span>
            <span className="text-primary-600">{property.title}</span>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <div className="h-96 rounded-lg overflow-hidden">
                <img src={images[0]} alt={property.title} className="w-full h-full object-cover" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {images.slice(1).map((image, index) => (
                  <div key={image} className="h-32 rounded-lg overflow-hidden">
                    <img src={image} alt={`${property.title} ${index + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h2 className="text-2xl font-bold mb-4">About this property</h2>
              <p className="text-secondary-600 mb-6">{property.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <FiHome className="text-primary-600" />
                  <span>{property.beds} bedrooms</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FiMaximize2 className="text-primary-600" />
                  <span>{property.sqft.toLocaleString()} sqft</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FiCalendar className="text-primary-600" />
                  <span>Built {property.yearBuilt}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FiGrid className="text-primary-600" />
                  <span>{property.lotSize}</span>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-4">Immersive experiences</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {experiences.map((experience) => (
                  <span key={experience} className="px-3 py-1 rounded-full bg-primary-50 text-primary-700 font-medium">
                    {experience}
                  </span>
                ))}
              </div>

              <h3 className="text-xl font-semibold mb-4">Features</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center space-x-2">
                    <FiHome className="text-primary-600" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-sm text-secondary-500">Listed at</p>
              <p className="text-3xl font-bold mb-2">${property.price.toLocaleString()}</p>
              <p className="text-secondary-600 mb-6">{property.location}</p>

              <div className="space-y-3 mb-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-secondary-600">Bedrooms</span>
                  <span className="font-medium">{property.beds}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-600">Bathrooms</span>
                  <span className="font-medium">{property.baths}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-600">Parking</span>
                  <span className="font-medium">{property.parkingSpaces} spaces</span>
                </div>
              </div>

              <Link to={`/properties/${property.id}/3d`} className="btn w-full mb-3 flex items-center justify-center">
                <FiBox className="mr-2" />
                Open 3D tour
              </Link>
              {experiences.includes('AR') && (
                <Link to={`/properties/${property.id}/ar`} className="btn w-full mb-3 flex items-center justify-center bg-primary-800 hover:bg-primary-900">
                  <FiSmartphone className="mr-2" />
                  AR Preview
                </Link>
              )}
              <form onSubmit={submitInquiry} className="space-y-3 mb-3">
                <input
                  className="input"
                  placeholder="Your name"
                  value={inquiry.name}
                  onChange={(event) => setInquiry((prev) => ({ ...prev, name: event.target.value }))}
                  required
                />
                <input
                  className="input"
                  type="email"
                  placeholder="Email"
                  value={inquiry.email}
                  onChange={(event) => setInquiry((prev) => ({ ...prev, email: event.target.value }))}
                  required
                />
                <textarea
                  className="input"
                  rows="3"
                  placeholder="Ask about a live walkthrough"
                  value={inquiry.message}
                  onChange={(event) => setInquiry((prev) => ({ ...prev, message: event.target.value }))}
                  required
                />
                <button type="submit" className="btn-secondary w-full flex items-center justify-center">
                  Request a live walkthrough
                </button>
                {inquiryStatus && <p className="text-sm text-secondary-600">{inquiryStatus}</p>}
              </form>

              <div className="flex items-center justify-center space-x-4 pt-4 mt-4 border-t">
                <FacebookShareButton url={shareUrl}>
                  <FaFacebook className="text-2xl text-blue-600 hover:opacity-80" />
                </FacebookShareButton>
                <TwitterShareButton url={shareUrl}>
                  <FaTwitter className="text-2xl text-sky-500 hover:opacity-80" />
                </TwitterShareButton>
                <LinkedinShareButton url={shareUrl}>
                  <FaLinkedin className="text-2xl text-blue-700 hover:opacity-80" />
                </LinkedinShareButton>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={listingAgent.image}
                  alt={listingAgent.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">{listingAgent.name}</h3>
                  <p className="text-sm text-secondary-600">{listingAgent.role}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Phone:</span> {listingAgent.phone}</p>
                <p><span className="font-medium">Email:</span> {listingAgent.email}</p>
              </div>
              <a href={`mailto:${listingAgent.email}`} className="btn-secondary w-full mt-4 inline-flex justify-center">
                Contact agent
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetail;
