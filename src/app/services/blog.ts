import { Injectable } from '@angular/core';

export interface Blog {
  id: string;
  title: string;
  content: string; 
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private posts: Blog[] = [
    {
      id: 'vaults',
      title: 'High-Security Vault Solutions',
      image: '/vaultblog.jpg',
      content: `
        <p>Vaults are essential for safeguarding valuable assets, including documents, cash, jewelry, and sensitive business materials. In today’s uncertain world, a reliable and secure storage solution is no longer optional it’s a necessity. At FilSafe, we specialize in designing high-security vaults that exceed industry standards, providing maximum protection for your most valuable assets.</p>
        
        <p>Our premium vaults feature reinforced steel construction and advanced fire-resistant materials, offering superior protection against theft, fire hazards, and structural damage. Every vault is rigorously tested to endure extreme conditions, ensuring your valuables remain safe even in emergencies such as fires, natural disasters, or building failures.</p>
        
        <p>Each FilSafe vault comes with state of the art locking systems, including modern mechanical and electronic security options, to prevent unauthorized access. We recognize that every client’s security needs are unique. That’s why our experts assess your location, risk factors, and space requirements to recommend the most effective custom vault solution.</p>
        
        <p>At FilSafe, we prioritize long-term reliability and exceptional customer support. Whether you need a compact personal vault or a large-scale enterprise vault system, our solutions are built to last. With a FilSafe vault, you gain not only durable protection but also peace of mind.</p>
      `
    },
    {
      id: 'cctv-systems',
      title: 'Maximize Safety with Advanced CCTV Surveillance',
      image: '/cctvBlog.jpg',
      content: `
        <p>In the digital age, security has evolved beyond simple locks and keys. <strong>CCTV surveillance systems</strong> have become the backbone of modern property protection, offering a proactive approach to safety for both homeowners and businesses. At FilSafe, we integrate cutting-edge technology to ensure your premises are monitored 24/7 with crystal-clear precision.</p>
          
        <p>Our latest camera systems feature <strong>4K Ultra-HD resolution</strong> and infrared night vision, allowing for total visibility even in complete darkness. Unlike traditional analog systems, our IP-based cameras provide remote access, enabling you to view live feeds directly from your smartphone or tablet, no matter where you are in the world.</p>
          
        <p>Beyond simple recording, FilSafe implements <strong>AI-powered motion detection</strong>. This technology distinguishes between harmless movements, like a stray animal or swaying trees, and actual security threats. By reducing false alarms, we ensure that when you receive a notification, it actually matters. This efficiency is why FilSafe is a leader in smart security integration.</p>
          
        <p>Investing in a professional CCTV setup isn't just about catching intruders; it's about deterrence. Statistics show that properties with visible, high-quality surveillance systems are significantly less likely to be targeted by criminal activity. With FilSafe, you aren't just buying cameras; you are investing in a comprehensive security strategy designed to give you total peace of mind.</p>
      `
    },
    {
  id: 'intrusion-alarms',
  title: 'Why Alarm Systems Are the First Line of Defense for Your Property',
  image: '/AlarmBlog.jpg',
  content: `
    <p>Security threats can happen at any time, whether at home or in the workplace. An <strong>alarm system</strong> is one of the most effective ways to protect your property by detecting unauthorized access and alerting you instantly. When combined with CCTV cameras and safes, alarm systems create a strong, layered approach to security.</p>

    <h3>What Is an Alarm System?</h3>
    <p>An alarm system is a security solution designed to detect intrusions, forced entry, or suspicious activity. Once triggered, the system emits a loud siren and sends alerts to homeowners, business owners, or monitoring centers—helping prevent theft and minimize damage.</p>
    
    <p>Alarm systems are commonly used in:</p>
    <ul>
      <li>Residential homes and apartments</li>
      <li>Offices and corporate buildings</li>
      <li>Retail stores and warehouses</li>
      <li>Schools, clinics, and commercial spaces</li>
    </ul>

    <h3>Types of Alarm Systems</h3>
    <p>Different environments require different types of alarms. Choosing the right system ensures maximum protection:</p>
    <ol>
      <li><strong>Burglar Alarm Systems:</strong> These systems use door and window sensors, motion detectors, and control panels to detect intrusions and immediately raise an alert.</li>
      <li><strong>Wireless Alarm Systems:</strong> Easy to install and expand, wireless alarms are ideal for homes and businesses that want flexibility without extensive wiring.</li>
      <li><strong>Smart Alarm Systems:</strong> Smart alarms connect to mobile apps, allowing users to arm, disarm, and monitor their system remotely from anywhere.</li>
      <li><strong>24/7 Monitored Alarm Systems:</strong> These alarms are connected to a professional monitoring center that responds immediately to emergency alerts.</li>
    </ol>

    <h3>How Alarm Systems Work with CCTV and Safes</h3>
    <p>Alarm systems are most effective when paired with other security solutions. Alarms detect and respond instantly to threats, while <strong>CCTV Cameras</strong> capture real-time footage and evidence. Meanwhile, <strong>Safes</strong> protect valuables even if a breach occurs.</p>

    <h3>Benefits of Installing an Alarm System</h3>
    <ul>
      <li>Immediate alerts during unauthorized access</li>
      <li>Strong deterrent against break-ins</li>
      <li>Faster emergency response</li>
      <li>Lower insurance risks and premiums</li>
      <li>Peace of mind for property owners</li>
    </ul>

    <h3>Why Professional Installation Matters</h3>
    <p>A professionally installed alarm system ensures that sensors are placed correctly and the system is configured to match your property layout. Experts can also integrate your alarm with CCTV and safes, creating a seamless and reliable security solution.</p>

    <p><strong>Protect Your Property Before It’s Too Late.</strong> An alarm system is more than just a siren—it’s a proactive way to protect your home or business. By investing in a reliable alarm system and combining it with CCTV cameras and safes, you create a security setup that works around the clock to keep you safe.</p>
  `
  }

  ];

  getPostById(id: string): Blog | undefined {
    return this.posts.find(p => p.id === id);
  }
}