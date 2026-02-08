'use client';

export default function Footer() {
    return (
        <footer className="footer-area">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <div className="footer_widget">
                            <h4>हाम्रो बारेमा</h4>
                            <p className="text-secondary">यो नेपालको भरपर्दो अनलाइन समाचार पोर्टल हो। हामी सत्य, तथ्य र निष्पक्ष समाचार सम्प्रेषण गर्छौं।</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="footer_widget">
                            <h4>हाम्रो मिशन</h4>
                            <p className="text-secondary">भू-राजनीतिक घटनाक्रम, सैन्य रणनीति र साइबर सुरक्षाका क्षेत्रमा गहिरो विश्लेषण।</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="footer_widget">
                            <h4>सोसल मिडिया</h4>
                            <div className="header_social justify-content-start">
                                <ul className="pl-0">
                                    <li className="facebook ml-0"><a href="#"><i className="fab fa-facebook-f text-white"></i></a></li>
                                    <li className="twitter"><a href="#"><i className="fab fa-twitter text-white"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-md-12 text-center text-secondary">
                        <p>&copy; {new Date().getFullYear()} Daily Geopolitics. सर्वाधिकार सुरक्षित।</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
