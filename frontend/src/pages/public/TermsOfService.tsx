import React, { useEffect } from 'react';

const TermsOfService = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return (
		<>
			<div className=" w-auto mx-3 md:mx-20 mt-24	">
				<h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
				<section className="mb-4">
					<h2 className="text-2xl font-semibold mb-2">Acceptance of Terms</h2>
					<p>
						By accessing or using the BookMyVenue application ("App"), you agree to be bound by these Terms of Service ("Terms"). BookMyVenue is a
						platform that facilitates connections between venue owners ("Owners") and individuals or organizations seeking to book venues for events
						("Users"). If you do not agree to these Terms, please do not use our App.
					</p>
				</section>
				<section className="mb-4">
					<h2 className="text-2xl font-semibold mb-2">User Accounts</h2>
					<div className="ml-4">
						<h3 className="text-xl font-semibold mb-1">2.1 Registration</h3>
						<p className="mb-2 leading-6">
							To use BookMyVenue, you must create an account. You agree to provide accurate, current, and complete information during the registration
							process.
						</p>
						<h3 className="text-xl font-semibold mb-1">2.2 Account Security</h3>
						<p className="mb-2 leading-6">
							You are responsible for maintaining the confidentiality of your account. You agree to notify us immediately of any unauthorized use of
							your account.
						</p>
						<h3 className="text-xl font-semibold mb-1">2.3 Account Types</h3>
						<p className="mb-2 leading-6">BookMyVenue offers two types of accounts:</p>
						<ul className="list-disc list-inside">
							<li className="mb-1">User accounts for those seeking to book venues</li>
							<li className="mb-1">Owner accounts for those listing venues</li>
						</ul>
					</div>
				</section>

				<section className="mb-4">
					<h2 className="text-2xl font-semibold mb-2">Venue Booking Process</h2>
					<div className="ml-4">
						<h3 className="text-xl font-semibold mb-1">3.1 Searching</h3>
						<p className="mb-2 leading-6">Users can search for venues based on location, category, title, and other filters provided in the App.</p>
						<h3 className="text-xl font-semibold mb-1">3.2 Booking Requests</h3>
						<p className="mb-2 leading-6">Users can submit booking requests for their desired venues and dates.</p>
						<h3 className="text-xl font-semibold mb-1">3.3 Approval</h3>
						<p className="mb-2 leading-6">All bookings are subject to Owner approval. Owners have 48 hours to respond to booking requests.</p>
						<h3 className="text-xl font-semibold mb-1">3.4 Confirmation</h3>
						<p className="mb-2 leading-6">Once an Owner approves a booking request, Users will receive a confirmation notification.</p>
					</div>
				</section>

				<section className="mb-4">
					<h2 className="text-2xl font-semibold mb-2">User Responsibilities</h2>
					<div className="ml-4">
						<h3 className="text-xl font-semibold mb-1">4.1 Accurate Information</h3>
						<p className="mb-2 leading-6">Users must provide accurate personal and event information when creating an account and making bookings.</p>
						<h3 className="text-xl font-semibold mb-1">4.2 Proper Use</h3>
						<p className="mb-2 leading-6">
							Users agree to use the booked venues only for the stated purpose and in compliance with all applicable laws and regulations.
						</p>
						<h3 className="text-xl font-semibold mb-1">4.3 Venue Rules</h3>
						<p className="mb-2 leading-6">
							Users must adhere to any specific rules set by the Venue Owner, which will be clearly communicated through the App.
						</p>
						<h3 className="text-xl font-semibold mb-1">4.4 Property Respect</h3>
						<p className="mb-2 leading-6">
							Users are responsible for leaving the venue in the same condition as they found it, subject to normal wear and tear.
						</p>
					</div>
				</section>

				<section className="mb-4">
					<h2 className="text-2xl font-semibold mb-2">Venue Owner Responsibilities</h2>
					<div className="ml-4">
						<h3 className="text-xl font-semibold mb-1">5.1 Accurate Listings</h3>
						<p className="mb-2 leading-6">
							Owners must provide accurate and up-to-date information about their venues, including photos, capacity, amenities, and availability.
						</p>
						<h3 className="text-xl font-semibold mb-1">5.2 Legal Compliance</h3>
						<p className="mb-2 leading-6">
							Owners are responsible for ensuring their venues meet all safety standards and legal requirements for public use.
						</p>
						<h3 className="text-xl font-semibold mb-1">5.3 Honoring Bookings</h3>
						<p className="mb-2 leading-6">
							Once a booking is confirmed, Owners must honor it unless there are extenuating circumstances (e.g., force majeure events).
						</p>
						<h3 className="text-xl font-semibold mb-1">5.4 Venue Maintenance</h3>
						<p className="mb-2 leading-6">
							Owners must maintain their venues as advertised and promptly address any issues that may affect bookings.
						</p>
					</div>
				</section>

				<section className="mb-4">
					<h2 className="text-2xl font-semibold mb-2">Payments and Fees</h2>
					<div className="ml-4">
						<h3 className="text-xl font-semibold mb-1">6.1 Payment Processing</h3>
						<p className="mb-2 leading-6">BookMyVenue processes all payments through secure third-party payment processors.</p>
						<h3 className="text-xl font-semibold mb-1">6.2 Service Fee</h3>
						<p className="mb-2 leading-6">We charge a 10% service fee on each booking, which is added to the venue rental price.</p>
						<h3 className="text-xl font-semibold mb-1">6.3 Payout Schedule</h3>
						<p className="mb-2 leading-6">Owners receive payouts for confirmed bookings within 7 business days after the event date.</p>
						<h3 className="text-xl font-semibold mb-1">6.4 Cancellation and Refund Policies</h3>
						<p className="mb-2 leading-6">a) Owners set their own cancellation policies, which must be clearly displayed on their venue listings.</p>
						<p className="mb-2 leading-6">b) Users are subject to these policies when making cancellations.</p>
						<p className="mb-2 leading-6">c) BookMyVenue reserves the right to mediate disputes related to cancellations and refunds.</p>
					</div>
				</section>

				<section className="mb-4">
					<h2 className="text-2xl font-semibold mb-2">Liability</h2>
					<div className="ml-4">
						<h3 className="text-xl font-semibold mb-1">7.1 Platform Limitation</h3>
						<p className="mb-2 leading-6">
							BookMyVenue is a platform that facilitates connections between Users and Owners. We do not own, manage, or control any venues listed on
							our App.
						</p>
						<h3 className="text-xl font-semibold mb-1">7.2 No Warranty</h3>
						<p className="mb-2 leading-6">We do not warrant the condition, quality, or safety of any venue listed on our App.</p>
						<h3 className="text-xl font-semibold mb-1">7.3 Dispute Limitation</h3>
						<p className="mb-2 leading-6">
							BookMyVenue is not responsible for resolving disputes between Users and Owners, except where expressly stated in these Terms.
						</p>
						<h3 className="text-xl font-semibold mb-1">7.4 Insurance</h3>
						<p className="mb-2 leading-6">
							We strongly recommend that both Users and Owners obtain appropriate insurance coverage for their events and properties.
						</p>
					</div>
				</section>

				<section className="mb-4">
					<h2 className="text-2xl font-semibold mb-2">Reviews and Ratings</h2>
					<div className="ml-4">
						<h3 className="text-xl font-semibold mb-1">8.1 Review System</h3>
						<p className="mb-2 leading-6">Users can leave reviews and ratings for venues after their events.</p>
						<h3 className="text-xl font-semibold mb-1">8.2 Content Guidelines</h3>
						<p className="mb-2 leading-6">
							Reviews must be honest, relevant, and constructive. Personal attacks, hate speech, or irrelevant content is prohibited.
						</p>
						<h3 className="text-xl font-semibold mb-1">8.3 Owner Responses</h3>
						<p className="mb-2 leading-6">Venue Owners have the right to respond to reviews publicly on the platform.</p>
						<h3 className="text-xl font-semibold mb-1">8.4 Moderation</h3>
						<p className="mb-2 leading-6">
							BookMyVenue reserves the right to remove or edit reviews that violate our content guidelines or Terms of Service.
						</p>
					</div>
				</section>

				<section className="mb-4">
					<h2 className="text-2xl font-semibold mb-2">Intellectual Property</h2>
					<div className="ml-4">
						<h3 className="text-xl font-semibold mb-1">9.1 App Content</h3>
						<p className="mb-2 leading-6">
							The BookMyVenue App, including its design, features, and content, is protected by copyright, trademark, and other laws.
						</p>
						<h3 className="text-xl font-semibold mb-1">9.2 User-Generated Content</h3>
						<p className="mb-2 leading-6">
							By posting content on BookMyVenue (including reviews and venue listings), you grant us a non-exclusive, worldwide, royalty-free license
							to use, modify, and display that content on our platform.
						</p>
						<h3 className="text-xl font-semibold mb-1">9.3 Prohibited Use</h3>
						<p className="mb-2 leading-6">
							You may not use our intellectual property, including our logo or brand name, without explicit written permission.
						</p>
					</div>
				</section>

				<section className="mb-4">
					<h2 className="text-2xl font-semibold mb-2">Privacy and Data</h2>
					<div className="ml-4">
						<h3 className="text-xl font-semibold mb-1">10.1 Data Collection</h3>
						<p className="mb-2 leading-6">
							We collect and use data as outlined in our Privacy Policy, which is incorporated into these Terms by reference.
						</p>
						<h3 className="text-xl font-semibold mb-1">10.2 Location Data</h3>
						<p className="mb-2 leading-6">
							The App uses location data to show nearby venues and enhance user experience. Users can control location permissions through their
							device settings.
						</p>
						<h3 className="text-xl font-semibold mb-1">10.3 Communication</h3>
						<p className="mb-2 leading-6">
							By using BookMyVenue, you agree to receive communications from us, including booking updates, promotional offers, and service
							announcements.
						</p>
					</div>
				</section>

				<section className="mb-4">
					<h2 className="text-2xl font-semibold mb-2">Prohibited Activities</h2>
					<div className="ml-4">
						<p className="mb-2 leading-6">Users and Owners are prohibited from:</p>
						<ul className="list-disc list-inside">
							<li className="mb-1">Using BookMyVenue for any illegal activities or to promote illegal activities.</li>
							<li className="mb-1">Harassing, threatening, or intimidating other users of the App.</li>
							<li className="mb-1">Posting false, misleading, or fraudulent content.</li>
							<li className="mb-1">Attempting to circumvent the booking process to avoid service fees.</li>
							<li className="mb-1">Using the App to spam or send unsolicited advertisements.</li>
							<li className="mb-1">Impersonating others or creating fake accounts.</li>
						</ul>
					</div>
				</section>

				<section className="mb-4">
					<h2 className="text-2xl font-semibold mb-2">Termination</h2>
					<div className="ml-4">
						<h3 className="text-xl font-semibold mb-1">12.1 Account Termination</h3>
						<p className="mb-2 leading-6">
							BookMyVenue reserves the right to suspend or terminate accounts for violations of these Terms, or for any other reason we deem necessary
							to protect our users or business interests.
						</p>
						<h3 className="text-xl font-semibold mb-1">12.2 Effect of Termination</h3>
						<p className="mb-2 leading-6">
							Upon termination, users lose access to their account and any future bookings. We will honor any confirmed bookings made prior to
							termination.
						</p>
						<h3 className="text-xl font-semibold mb-1">12.3 Data Retention</h3>
						<p className="mb-2 leading-6">We may retain certain data associated with terminated accounts for legal and operational purposes.</p>
					</div>
				</section>
				<section className="mb-4">
					<h2 className="text-2xl font-semibold mb-2">Changes to Service</h2>
					<div className="ml-4">
						<h3 className="text-xl font-semibold mb-1">13.1 Service Updates</h3>
						<p className="mb-2 leading-6">We may modify, suspend, or discontinue any part of BookMyVenue at any time.</p>
						<h3 className="text-xl font-semibold mb-1">13.2 Terms Updates</h3>
						<p className="mb-2 leading-6">
							These Terms may be updated periodically. We will notify users of significant changes via email or through the App.
						</p>
						<h3 className="text-xl font-semibold mb-1">13.3 Continued Use</h3>
						<p className="mb-2 leading-6">
							Your continued use of BookMyVenue after any changes to the Terms constitutes acceptance of those changes.
						</p>
					</div>
				</section>
				<section className="mb-4">
					<h2 className="text-2xl font-semibold mb-2">Support and Disputes</h2>
					<div className="ml-4">
						<h3 className="text-xl font-semibold mb-1">14.1 Customer Support</h3>
						<p className="mb-2 leading-6">Our support team is available to assist with App-related issues and general inquiries.</p>
						<h3 className="text-xl font-semibold mb-1">14.2 Dispute Resolution</h3>
						<p className="mb-2 leading-6">
							We offer a mediation service for disputes between Users and Owners. However, we are not obligated to resolve all conflicts.
						</p>
						<h3 className="text-xl font-semibold mb-1">14.3 Arbitration</h3>
						<p className="mb-2 leading-6">
							Any dispute arising from these Terms or use of BookMyVenue shall be resolved through binding arbitration, except where prohibited by
							law.
						</p>
					</div>
				</section>
			</div>
		</>
	);
};

export default TermsOfService;
