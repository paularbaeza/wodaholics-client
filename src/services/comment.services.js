import service from "./config.services";


const createCommentService = (wodId, newComment) => {
    return service.post(`comment/${wodId}`, newComment);
  };

const getCommentsOfWodService = (wodId) => {
    return service.get (`comment/${wodId}`)
}

export {
    createCommentService,
    getCommentsOfWodService
  }
  