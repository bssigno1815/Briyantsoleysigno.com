if (!canRemoveAdmin(currentUser)) return res.status(403).json({ error: "Only super admin can remove admins." });
