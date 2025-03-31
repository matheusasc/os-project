import { Component, OnInit } from '@angular/core';
import { OsService } from '../os.service';
import { OrderService, ChecklistItem } from '../../shared/models/os.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-os-detail',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './os-detail.component.html',
  styleUrl: './os-detail.component.scss'
})
export class OsDetailComponent implements OnInit {
  order: OrderService = {
    technician: '',
    description: '',
    date: new Date(),
    checklist: [],
    status: 'open'
  };
  isNew = false;
  loading = true;
  photoPreview: string | null = null;

  constructor(
    private osService: OsService,
    private route: ActivatedRoute,
    public router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.order = {
      technician: '',
      description: '',
      date: new Date(),
      checklist: [],
      status: 'open'
    };

    const id = this.route.snapshot.paramMap.get('id');

    if (id === 'new') {
      this.isNew = true;
      this.order.checklist = this.osService.getDefaultChecklist();
      this.loading = false;
    } else {
      this.isNew = false;
      const staticOrderId = 1;

      this.osService.getOrder(staticOrderId).subscribe(
        order => {
          this.order = order;
          this.loading = false;
        },
        error => {
          console.error(error);
          this.loading = false;
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.order = {
      technician: '',
      description: '',
      date: new Date(),
      checklist: [],
      status: 'open'
    };
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.photoPreview = e.target?.result as string;
        this.order.photo = this.photoPreview;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  saveOrder(): void {
    if (this.isNew) {
      this.osService.createOrder(this.order).subscribe(
        () => {
          this.router.navigate(['/os']);
        },
        error => {
          console.error(error);
        }
      );
    } else {
      this.osService.updateOrder(this.order).subscribe(
        () => {
          this.router.navigate(['/os']);
        },
        error => {
          console.error(error);
        }
      );
    }
  }

  toggleChecklistItem(item: ChecklistItem): void {
    item.checked = !item.checked;
  }

  cancel(): void {
    this.router.navigate(['/os']);
  }
}
