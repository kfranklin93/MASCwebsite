import { Megaphone } from "lucide-react";
import { Button } from "../components/ui/buttons"; // Assuming you want to keep using the custom Button component
import { motion } from "framer-motion";
import '../index.css'; // Import the CSS file for this component

const HiringBanner = () => {
    return (
        <motion.div 
            className="hiring-banner"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Megaphone className="banner-icon" size={42} color="red"/>
            <span className="banner-title">
                We're Hiring! Join Our ABA Therapy Team.
            </span>
            <Button 
                className="banner-button"
                onClick={() => window.location.href = "/careers"}
            >
                Apply Now
            </Button>
        </motion.div>
    );
};

export default HiringBanner;