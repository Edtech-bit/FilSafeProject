import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router'; // Added RouterModule for links
import { BlogService, Blog } from '../../services/blog'; 

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog-detail.html',
  styleUrls: ['./blog-detail.css']
})
export class BlogDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private blogService = inject(BlogService);

  post: Blog | undefined;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.post = this.blogService.getPostById(id);
    }
  }
}