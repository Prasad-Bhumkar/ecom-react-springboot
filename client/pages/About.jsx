import { Link } from "react-router-dom";

export default function About() {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "https://tse1.mm.bing.net/th/id/OIP.CJ_8hB6ZtMjf_zJ0agIz2gHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
      description: "15+ years in e-commerce and retail innovation"
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      description: "Technology leader with expertise in scalable platforms"
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Customer Experience",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      description: "Passionate about creating exceptional customer journeys"
    },
    {
      name: "David Kim",
      role: "Head of Operations",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
      description: "Expert in logistics and supply chain optimization"
    }
  ];

  const values = [
    {
      icon: "bi-heart",
      title: "Customer First",
      description: "Everything we do is designed with our customers in mind, ensuring the best possible shopping experience."
    },
    {
      icon: "bi-shield-check",
      title: "Quality & Trust",
      description: "We partner with trusted brands and thoroughly vet every product to ensure quality and authenticity."
    },
    {
      icon: "bi-lightning",
      title: "Innovation",
      description: "We continuously innovate to bring you the latest technology and shopping experiences."
    },
    {
      icon: "bi-globe",
      title: "Sustainability",
      description: "We're committed to sustainable practices and supporting eco-friendly products and packaging."
    }
  ];

  const stats = [
    { number: "1M+", label: "Happy Customers" },
    { number: "50K+", label: "Products" },
    { number: "100+", label: "Brand Partners" },
    { number: "99.9%", label: "Uptime" }
  ];

  return (
    <div className="min-vh-100">
      {/* Hero Section */}
      <section className="bg-gradient-hero py-5">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold text-dark mb-4 animate-fade-up">
                About <span className="text-gradient">ShopFusion</span>
              </h1>
              <p className="lead text-muted mb-4 animate-fade-up-delay-1">
                We're on a mission to revolutionize online shopping by bringing you the best products 
                from around the world, all in one convenient platform.
              </p>
              <div className="animate-fade-up-delay-2">
                <Link to="/products" className="btn btn-gradient btn-lg me-3">
                  Explore Products
                </Link>
                <Link to="/contact" className="btn btn-outline-primary btn-lg">
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="col-lg-6 text-center animate-fade-up-delay-3">
              <img 
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=400&fit=crop" 
                alt="About ShopFusion" 
                className="img-fluid rounded shadow-lg"
                style={{maxHeight: '400px'}}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="row text-center">
            {stats.map((stat, index) => (
              <div key={index} className="col-md-3 col-6 mb-4">
                <h2 className="display-4 fw-bold text-primary">{stat.number}</h2>
                <p className="text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mb-4">
              <h2 className="display-5 fw-bold mb-4">Our Story</h2>
              <p className="mb-4">
                ShopFusion was founded in 2020 with a simple idea: make online shopping easier, 
                more enjoyable, and more accessible for everyone. What started as a small team 
                with big dreams has grown into a platform trusted by millions of customers worldwide.
              </p>
              <p className="mb-4">
                We believe that great products should be accessible to everyone, regardless of 
                where they live or what they're looking for. That's why we've built a platform 
                that brings together the best brands, the latest products, and the most competitive 
                prices all in one place.
              </p>
              <p>
                Today, we're proud to serve over 1 million customers across the globe, offering 
                everything from the latest electronics to sustainable home goods, fashion, and more.
              </p>
            </div>
            <div className="col-lg-6">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop" 
                alt="Our team" 
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">Our Values</h2>
            <p className="lead text-muted">The principles that guide everything we do</p>
          </div>
          <div className="row g-4">
            {values.map((value, index) => (
              <div key={index} className="col-md-6 col-lg-3">
                <div className="text-center">
                  <div className="feature-icon mx-auto mb-3">
                    <i className={`bi ${value.icon} fs-3`}></i>
                  </div>
                  <h5 className="fw-bold mb-3">{value.title}</h5>
                  <p className="text-muted">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">Meet Our Team</h2>
            <p className="lead text-muted">The passionate people behind ShopFusion</p>
          </div>
          <div className="row g-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="col-md-6 col-lg-3">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body text-center p-4">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="rounded-circle mb-3"
                      style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                    />
                    <h5 className="fw-bold mb-1">{member.name}</h5>
                    <p className="text-primary mb-2">{member.role}</p>
                    <p className="text-muted small">{member.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-5 bg-gradient-cta text-white">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <h2 className="display-5 fw-bold mb-4">Our Mission</h2>
              <p className="lead mb-4" style={{opacity: '0.9'}}>
                To create the world's most trusted and convenient online shopping platform, 
                where customers can discover amazing products, brands can reach new audiences, 
                and everyone benefits from a seamless, secure, and enjoyable shopping experience.
              </p>
              <Link to="/products" className="btn btn-light btn-lg text-primary">
                Start Shopping Today
                <i className="bi bi-arrow-right ms-2"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-6">
              <h3 className="fw-bold mb-3">Have Questions?</h3>
              <p className="text-muted mb-4">
                We'd love to hear from you. Get in touch with our team for any questions, 
                feedback, or partnership opportunities.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                <a href="mailto:hello@shopfusion.com" className="btn btn-outline-primary">
                  <i className="bi bi-envelope me-2"></i>
                  Email Us
                </a>
                <a href="tel:+1-555-123-4567" className="btn btn-outline-primary">
                  <i className="bi bi-telephone me-2"></i>
                  Call Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
