
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, User, Mail, Phone, Lock, Calendar, CheckCircle2, XCircle } from "lucide-react";

const SignupForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    fullName: "",
    age: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({
    email: "",
    phone: "",
    fullName: "",
    age: "",
    password: "",
    confirmPassword: ""
  });

  // Password strength checker
  const getPasswordStrength = (password: string) => {
    if (!password) return { score: 0, text: "" };
    
    let score = 0;
    
    // Length check
    if (password.length > 6) score += 1;
    if (password.length > 10) score += 1;
    
    // Complexity checks
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    
    let text = "";
    if (score === 0) text = "Very weak";
    else if (score <= 2) text = "Weak";
    else if (score <= 3) text = "Medium";
    else if (score <= 4) text = "Strong";
    else text = "Very strong";
    
    return { score, text };
  };

  const passwordStrength = getPasswordStrength(formData.password);
  
  const getStrengthColor = (score: number) => {
    if (score === 0) return "bg-gray-500";
    if (score <= 2) return "bg-red-500";
    if (score <= 3) return "bg-yellow-500";
    if (score <= 4) return "bg-green-500";
    return "bg-neon-blue";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when typing
    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };
    
    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }
    
    // Phone validation
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number should be 10 digits";
      isValid = false;
    }
    
    // Name validation
    if (!formData.fullName) {
      newErrors.fullName = "Full name is required";
      isValid = false;
    }
    
    // Age validation
    if (!formData.age) {
      newErrors.age = "Age is required";
      isValid = false;
    } else if (isNaN(Number(formData.age)) || Number(formData.age) < 12) {
      newErrors.age = "Age must be at least 12";
      isValid = false;
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    } else if (passwordStrength.score < 3) {
      newErrors.password = "Password is too weak";
      isValid = false;
    }
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        toast({
          title: "Account created successfully!",
          description: "Welcome to EasyWin Learning Hub",
        });
        navigate("/login");
      }, 1500);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative">
        {/* Glassmorphic card with neon border */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-blue rounded-xl opacity-70 blur-sm"></div>
        
        <div className="relative glassmorphic rounded-xl p-6 md:p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Create an Account</h1>
            <p className="text-gray-400 text-sm">
              Join the EasyWin community and start your learning journey
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-gray-300">
                Email <span className="text-neon-blue">*</span>
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`pl-10 bg-cyber-dark border-gray-700 focus:border-neon-blue focus:ring-neon-blue/20 
                    ${errors.email ? "border-red-500" : ""}`}
                  placeholder="your.email@example.com"
                />
              </div>
              {errors.email && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-xs mt-1 flex items-center"
                >
                  <XCircle size={12} className="mr-1" /> {errors.email}
                </motion.p>
              )}
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="phone" className="text-gray-300">
                Phone Number <span className="text-neon-blue">*</span>
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`pl-10 bg-cyber-dark border-gray-700 focus:border-neon-blue focus:ring-neon-blue/20 
                    ${errors.phone ? "border-red-500" : ""}`}
                  placeholder="1234567890"
                />
              </div>
              {errors.phone && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-xs mt-1 flex items-center"
                >
                  <XCircle size={12} className="mr-1" /> {errors.phone}
                </motion.p>
              )}
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="fullName" className="text-gray-300">
                Full Name <span className="text-neon-blue">*</span>
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`pl-10 bg-cyber-dark border-gray-700 focus:border-neon-blue focus:ring-neon-blue/20 
                    ${errors.fullName ? "border-red-500" : ""}`}
                  placeholder="John Doe"
                />
              </div>
              {errors.fullName && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-xs mt-1 flex items-center"
                >
                  <XCircle size={12} className="mr-1" /> {errors.fullName}
                </motion.p>
              )}
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="age" className="text-gray-300">
                Age <span className="text-neon-blue">*</span>
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  id="age"
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleChange}
                  min="12"
                  max="100"
                  className={`pl-10 bg-cyber-dark border-gray-700 focus:border-neon-blue focus:ring-neon-blue/20 
                    ${errors.age ? "border-red-500" : ""}`}
                  placeholder="25"
                />
              </div>
              {errors.age && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-xs mt-1 flex items-center"
                >
                  <XCircle size={12} className="mr-1" /> {errors.age}
                </motion.p>
              )}
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-gray-300">
                Password <span className="text-neon-blue">*</span>
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className={`pl-10 pr-10 bg-cyber-dark border-gray-700 focus:border-neon-blue focus:ring-neon-blue/20 
                    ${errors.password ? "border-red-500" : ""}`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              
              {/* Password strength meter */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex justify-between items-center mb-1">
                    <div className="h-1.5 w-full bg-gray-700 rounded-full overflow-hidden flex">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-full w-1/5 ${
                            i < passwordStrength.score 
                              ? getStrengthColor(passwordStrength.score) 
                              : "bg-gray-700"
                          } ${i > 0 ? "ml-0.5" : ""}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className={`text-xs ${
                    passwordStrength.score <= 2 
                      ? "text-red-400" 
                      : passwordStrength.score <= 3 
                        ? "text-yellow-400" 
                        : "text-green-400"
                  }`}>
                    {passwordStrength.text}
                  </p>
                </div>
              )}
              
              {errors.password && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-xs mt-1 flex items-center"
                >
                  <XCircle size={12} className="mr-1" /> {errors.password}
                </motion.p>
              )}
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="confirmPassword" className="text-gray-300">
                Confirm Password <span className="text-neon-blue">*</span>
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`pl-10 pr-10 bg-cyber-dark border-gray-700 focus:border-neon-blue focus:ring-neon-blue/20 
                    ${errors.confirmPassword ? "border-red-500" : ""}`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {formData.confirmPassword && formData.password === formData.confirmPassword && (
                <p className="text-green-400 text-xs mt-1 flex items-center">
                  <CheckCircle2 size={12} className="mr-1" /> Passwords match
                </p>
              )}
              {errors.confirmPassword && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-xs mt-1 flex items-center"
                >
                  <XCircle size={12} className="mr-1" /> {errors.confirmPassword}
                </motion.p>
              )}
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-neon-blue hover:bg-neon-blue/90 text-black font-semibold py-5 transition-all hover:shadow-neon-glow"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                "Sign Up"
              )}
            </Button>
            
            <div className="relative flex items-center justify-center mt-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative px-4 bg-cyber-darker text-sm text-gray-400">
                Or continue with
              </div>
            </div>
            
            <Button 
              type="button" 
              variant="outline"
              className="w-full border-gray-700 hover:bg-cyber-light hover:text-white"
            >
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Sign up with Google
            </Button>
            
            <div className="text-center mt-4 text-sm text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="text-neon-blue hover:underline">
                Log in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
