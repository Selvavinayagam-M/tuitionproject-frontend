import React from 'react';
import { Link } from 'react-router-dom';
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaEnvelope,
    FaChevronRight,
    FaArrowRight
} from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        quickLinks: [
            { name: 'Home', path: '/' },
            { name: 'About Us', path: '/about' },
            { name: 'Our Faculty', path: '/faculty' },
            { name: 'Testimonials', path: '/#testimonials' },
            { name: 'Contact', path: '/contact' }
        ],
        programs: [
            { name: 'Class 1-5 (Foundation)', to: '/', state: { scrollTo: 'programs', tab: 'primary' } },
            { name: 'Class 6-8 (Pre-High)', to: '/', state: { scrollTo: 'programs', tab: 'middle' } },
            { name: 'Class 9-10 (Board Prep)', to: '/', state: { scrollTo: 'programs', tab: 'secondary' } },
            { name: 'Class 11-12 (JEE/NEET)', to: '/', state: { scrollTo: 'programs', tab: 'senior' } },
            { name: 'Language Courses', to: '/courses/languages' }
        ],
        legal: [
            { name: 'Privacy Policy', path: '/privacy' },
            { name: 'Terms of Service', path: '/terms' }
        ]
    };

    const SocialLink = ({ href, icon: Icon }) => (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-500/30"
            aria-label="Social Media Link"
        >
            <Icon size={16} />
        </a>
    );

    const FooterLink = ({ to, state, children }) => (
        <li>
            <Link
                to={to}
                state={state}
                className="text-gray-400 hover:text-orange-500 flex items-center gap-2 transition-colors duration-200 group"
            >
                <FaChevronRight className="text-xs text-gray-600 group-hover:text-orange-500 transition-colors" />
                <span className="group-hover:translate-x-1 transition-transform duration-200">{children}</span>
            </Link>
        </li>
    );

    return (
        <footer className="bg-gray-900 text-gray-300 border-t border-gray-800 font-sans relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl translate-y-1/3 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Column 1: Brand & Contact */}
                    <div className="space-y-6">
                        <Link to="/" className="inline-block group">
                            <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                                Excellence<span className="text-orange-500">Tuition</span>
                            </h2>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Empowering students with personalized attention, expert faculty, and a result-oriented approach. Building a strong foundation for a brighter future.
                        </p>

                        <div className="space-y-4 pt-2">
                            <div className="flex items-start gap-4 group cursor-default">
                                <div className="mt-1 w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-orange-500 shrink-0 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                                    <FaMapMarkerAlt size={14} />
                                </div>
                                <div>
                                    <h4 className="text-white font-medium text-sm">Visit Us</h4>
                                    <p className="text-sm text-gray-400 mt-0.5">123 Education Lane, Knowledge City,<br />Bangalore - 560001</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 group cursor-default">
                                <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-orange-500 shrink-0 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                                    <FaPhoneAlt size={14} />
                                </div>
                                <div>
                                    <h4 className="text-white font-medium text-sm">Call Us</h4>
                                    <p className="text-sm text-gray-400 mt-0.5">+91 98765 43210</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 group cursor-default">
                                <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-orange-500 shrink-0 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                                    <FaEnvelope size={14} />
                                </div>
                                <div>
                                    <h4 className="text-white font-medium text-sm">Email Us</h4>
                                    <p className="text-sm text-gray-400 mt-0.5">info@excellencetuition.com</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4 border-t border-gray-800/50">
                            <SocialLink href="#" icon={FaFacebookF} />
                            <SocialLink href="#" icon={FaTwitter} />
                            <SocialLink href="#" icon={FaInstagram} />
                            <SocialLink href="#" icon={FaLinkedinIn} />
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                            <span className="w-1 h-6 bg-orange-500 rounded-full"></span>
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.quickLinks.map((link, idx) => (
                                <FooterLink key={idx} to={link.path}>{link.name}</FooterLink>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Academic Programs */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                            <span className="w-1 h-6 bg-orange-500 rounded-full"></span>
                            Our Programs
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.programs.map((link, idx) => (
                                <FooterLink key={idx} to={link.to} state={link.state}>{link.name}</FooterLink>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: CTA Card */}
                    <div>
                        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 shadow-xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl -mr-10 -mt-10 transition-all duration-500 group-hover:bg-orange-500/20"></div>

                            <h3 className="text-xl font-bold text-white mb-3 relative z-10">
                                Unlock Your Potential
                            </h3>
                            <p className="text-gray-400 text-sm mb-6 relative z-10">
                                Unsure which path to choose? Get a free personalized career counseling session with our experts.
                            </p>

                            <Link
                                to="/contact"
                                className="inline-flex items-center justify-center w-full gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transform hover:-translate-y-0.5 relative z-10"
                            >
                                Book Free Session
                                <FaArrowRight size={14} />
                            </Link>

                            <p className="text-xs text-gray-500 text-center mt-4">
                                Limited slots available this week
                            </p>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <p>&copy; {currentYear} Excellence Tuition Centre. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        {footerLinks.legal.map((link, idx) => (
                            <Link
                                key={idx}
                                to={link.path}
                                className="hover:text-orange-500 transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
