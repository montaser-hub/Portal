import Schedule from '../models/scheduleModel.js';

export const create = async (data) => {
  return await Schedule.create(data);
};

export const update = async (id, data) => {
  return await Schedule.findByIdAndUpdate(id, data, { new: true });
};

export const findById = async (id) => {
  return await Schedule.findById(id)
    .populate({path: 'department'
    , select: 'name'
    })
    .populate({path: 'subDepartment'
    , select: 'name'
    })
    .populate({path: 'user'
    , select: 'nickname'
    })
    .populate({path: 'shift'
    , select: 'name'
    });
};

export const findAll = () => {
  return Schedule.find()
    .populate({path: 'department'
    , select: 'name'
    })
    .populate({path: 'subDepartment'
    , select: 'name'
    })
    .populate({path: 'user'
    , select: 'nickname'
    })
    .populate({path: 'shift'
    , select: 'name'
    });

};

export const deleteOne = async (id) => {
  return await Schedule.findByIdAndDelete(id);
};

// Get count of all records (useful for pagination)
export const countAll = () => Schedule.countDocuments();

// Optionally, get count based on filters (for filtered total)
export const countFiltered = (filter) => Schedule.countDocuments(filter);
