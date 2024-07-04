document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.edit-topic-btn').forEach(button => {
      button.addEventListener('click', function() {
        const topicId = this.getAttribute('data-id');
        const form = document.querySelector(`.edit-topic-form[data-id="${topicId}"]`);
        form.style.display = form.style.display === 'none' ? 'block' : 'none';
      });
    });
  
    document.querySelectorAll('.edit-post-btn').forEach(button => {
      button.addEventListener('click', function() {
        const postId = this.getAttribute('data-id');
        const form = document.querySelector(`.edit-post-form[data-id="${postId}"]`);
        form.style.display = form.style.display === 'none' ? 'block' : 'none';
      });
    });
  
    document.querySelectorAll('.edit-btn').forEach(button => {
      button.addEventListener('click', function() {
        const commentId = this.getAttribute('data-id');
        const form = document.querySelector(`.edit-form[data-id="${commentId}"]`);
        form.style.display = form.style.display === 'none' ? 'block' : 'none';
      });
    });
  
    document.querySelectorAll('.like-btn').forEach(button => {
      button.addEventListener('click', async function() {
        const commentId = this.getAttribute('data-id');
        await fetch(`/comments/${commentId}/like`, {
          method: 'POST'
        });
        location.reload();
      });
    });
  
    document.querySelectorAll('.dislike-btn').forEach(button => {
      button.addEventListener('click', async function() {
        const commentId = this.getAttribute('data-id');
        await fetch(`/comments/${commentId}/dislike`, {
          method: 'POST'
        });
        location.reload();
      });
    });

    document.querySelectorAll('.tagify-input').forEach(input => {
      new Tagify(input);
    });
  });
  