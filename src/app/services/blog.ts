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
      title: 'High-Security Vault Solutions for Ultimate Asset Protection',
      image: '/vaultblog.jpg',
      content: `
        <p>In a world where both physical and environmental threats are increasing, protecting your most valuable assets has never been more important. <strong>High-security vault systems</strong> are the gold standard for safeguarding cash, documents, jewelry, data storage, and critical business assets. At <strong>FilSafe</strong>, we engineer premium vault solutions designed to deliver maximum protection, durability, and long-term reliability.</p>

        <h3>Why High-Security Vaults Are a Smart Investment</h3>
        <p>Unlike ordinary safes, professional vault systems are designed to resist not only theft, but also fire, structural collapse, and environmental damage.</p>

        <ul>
          <li> Protects high-value assets from theft and forced entry</li>
          <li> Shields important documents from fire, heat, and smoke damage</li>
          <li> Secures sensitive materials, data backups, and business records</li>
          <li> Provides controlled access for authorized personnel only</li>
          <li> Increases insurance compliance and business security ratings</li>
        </ul>

        <h3>Military-Grade Construction & Fire Protection</h3>
        <p>FilSafe vaults are built using <strong>reinforced steel plating</strong> and <strong>multi-layer composite walls</strong> designed to withstand extreme physical attacks. Our vault systems also feature <strong>advanced fire-resistant materials</strong> capable of protecting contents during high-temperature emergencies such as fires, earthquakes, and building failures.</p>

        <p>Every vault is rigorously tested to ensure structural integrity and long-term performance even under the harshest conditions.</p>

        <h3>Advanced Locking & Access Control Systems</h3>
        <p>Security is only as strong as its locking mechanism. That’s why FilSafe vaults support multiple high-end access systems:</p>

        <ul>
          <li> High-security mechanical combination locks</li>
          <li> Electronic keypad and digital access systems</li>
          <li> Biometric fingerprint and multi-factor authentication</li>
          <li> Time-delay and audit-trail access logging (for businesses)</li>
        </ul>

        <p>This layered security approach ensures that only authorized individuals can access your vault.</p>

        <h3>Custom-Built for Your Space & Security Needs</h3>
        <p>No two security requirements are the same. FilSafe provides <strong>custom-designed vault solutions</strong> based on:</p>

        <ul>
          <li> Location and building structure</li>
          <li> Risk level and threat assessment</li>
          <li> Size, capacity, and usage requirements</li>
          <li> Residential, commercial, or enterprise applications</li>
        </ul>

        <p>From compact personal vault rooms to large-scale enterprise vault installations, we design systems that fit seamlessly into your space.</p>

        <h3>Ideal Applications for FilSafe Vault Systems</h3>
        <ul>
          <li> Banks and financial institutions</li>
          <li> Jewelry stores and pawnshops</li>
          <li> Corporate offices and data centers</li>
          <li> Hospitals and government facilities</li>
          <li> High-net-worth private residences</li>
        </ul>

        <p><strong>With FilSafe Vault Solutions, you don’t just store valuables — you protect your legacy.</strong></p>
      `
    },

    {
      id: 'cctv-systems',
      title: 'Maximize Safety with Advanced CCTV Surveillance Systems',
      image: '/cctvBlog.jpg',
      content: `
        <p>In today’s digital world, security is no longer optional — it is essential. <strong>CCTV surveillance systems</strong> have become the foundation of modern property protection for homes, offices, warehouses, and commercial establishments. At <strong>FilSafe</strong>, we provide intelligent, reliable, and future-ready CCTV solutions designed to protect what matters most.</p>

        <h3>Why CCTV Systems Are Essential Today</h3>
        <p>Modern threats require modern solutions. A professionally installed CCTV system does more than just record video — it actively prevents crime, increases safety, and provides valuable evidence when incidents occur.</p>

        <ul>
          <li> Deters theft, vandalism, and trespassing</li>
          <li> Provides 24/7 real-time monitoring</li>
          <li> Supplies recorded video evidence for investigations</li>
          <li> Improves employee productivity and accountability</li>
          <li> Enhances overall property safety and peace of mind</li>
        </ul>

        <h3>High-Definition & Smart Monitoring Technology</h3>
        <p>Our CCTV systems feature <strong>4K Ultra-HD cameras</strong> and <strong>infrared night vision</strong>, ensuring crystal-clear footage even in low-light or total darkness. Unlike outdated analog systems, FilSafe uses <strong>IP-based smart cameras</strong> that allow you to:</p>

        <ul>
          <li> View live feeds from your smartphone, tablet, or computer</li>
          <li> Access recordings anytime, anywhere</li>
          <li> Monitor multiple locations from one dashboard</li>
          <li> Securely store footage locally or in the cloud</li>
        </ul>

        <h3>AI-Powered Threat Detection</h3>
        <p>FilSafe integrates <strong>AI-powered motion detection</strong> and smart analytics that can:</p>

        <ul>
          <li> Detect humans and vehicles separately</li>
          <li> Ignore animals, shadows, and moving trees</li>
          <li> Reduce false alarms by up to 90%</li>
          <li> Instantly notify you of real security threats</li>
        </ul>

        <p>This intelligent filtering ensures that when you receive an alert, it truly matters.</p>

        <h3>More Than Security — A Smart Investment</h3>
        <p>Installing CCTV is not only about recording incidents — it is about <strong>preventing them before they happen</strong>. Studies show that properties with visible, high-quality surveillance systems are significantly less likely to be targeted by criminals.</p>

        <p>With FilSafe, you are not just buying cameras — you are investing in a <strong>complete, scalable, and future-proof security ecosystem</strong> that grows with your needs.</p>

        <h3>Where Our CCTV Systems Work Best</h3>
        <ul>
          <li> Homes and subdivisions</li>
          <li> Offices and corporate buildings</li>
          <li> Warehouses and factories</li>
          <li> Retail stores and malls</li>
          <li> Schools, hospitals, and institutions</li>
        </ul>

        <p><strong>Protect your property. Monitor with confidence. Secure your future with FilSafe CCTV Systems.</strong></p>
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