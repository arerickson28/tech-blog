module.exports = {
    format_date: (date) => {
      // Format date as MM/DD/YYYY
      return date.toLocaleDateString();
    },

    has_comment: (postId, commentId) => {
        if (postId == commentId) {
            return true
        }
    }
}