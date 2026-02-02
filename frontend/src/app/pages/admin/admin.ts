import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill'; 
import { BlogService, Blog } from '../../services/blog';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, QuillModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin implements OnInit {
  blogs: Blog[] = [];
  
  // FIX: Added imageAlt to the initial object to satisfy the Blog interface
  newBlog: Blog = { 
    title: '', 
    shortDescription: '', 
    content: '', 
    image: '',
    imageAlt: '' 
  };

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.loadBlogs();
  }

  loadBlogs() {
    this.blogService.getPosts().subscribe(data => this.blogs = data);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.newBlog.image = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onBlogSubmit() {
    this.blogService.addPost(this.newBlog).subscribe({
      next: () => {
        alert('Blog Published!');
        this.newBlog = { 
          title: '', 
          shortDescription: '', 
          content: '', 
          image: '',
          imageAlt: '' 
        };
        this.loadBlogs();
      },
      error: (err: any) => console.error('Upload failed', err)
    });
  }

  onDeleteBlog(id: string | undefined) {
    if (id && confirm('Delete this post?')) {
      this.blogService.deletePost(id).subscribe(() => this.loadBlogs());
    }
  }
}