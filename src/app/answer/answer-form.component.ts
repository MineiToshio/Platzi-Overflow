import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Answer } from './answer.model';
import { Question } from '../question/question.model';
import { QuestionService } from '../question/question.service';
import SweetScroll from 'sweet-scroll';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-answer-form',
  templateUrl: './answer-form.component.html',
  styles: [`
    form {
      margin-top: 20px;
    }
  `],
  providers: [QuestionService]
})

export class AnswerFormComponent {
  @Input() question: Question;
  sweetScroll: SweetScroll;

  constructor(private questionService: QuestionService, private authService: AuthService, private router: Router) {
    this.sweetScroll = new SweetScroll();
  }

  onSubmit(form: NgForm) {
    if(!this.authService.isLoggedIn())
      this.router.navigateByUrl('/signin');

    const answer = new Answer(
      form.value.description,
      this.question
    );
    this.questionService.addAnswer(answer)
      .subscribe(
        a => {
          this.question.answers.unshift(a);
          this.sweetScroll.to('#title');
        },
        this.authService.handleError
      );

    form.reset();
  }
}
