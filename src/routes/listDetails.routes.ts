import { Router } from "express";
import * as ctrl from "../controllers/listDetails.controller";

const router = Router();

router.get("/", ctrl.getAll);                               
router.get("/:id", ctrl.getById);                           
router.post("/", ctrl.create);                              
router.put("/:id", ctrl.update);                            
router.patch("/:id/toggle", ctrl.toggleComplete);           
router.delete("/master/:masterId", ctrl.removeAllByMaster); 
router.delete("/:id", ctrl.remove);                         

export default router;