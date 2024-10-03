<script setup lang="ts">
const columns = [ {
  key: 'name',
  label: 'Name',
  sortable: true
}, {
  key: 'title',
  label: 'Title',
  sortable: true
}, {
  key: 'email',
  label: 'Email',
  sortable: true,
  direction: 'desc' as const
}, {
  key: 'role',
  label: 'Role'
}]

const people = [{
  id: 1,
  name: "Lindsay Walton",
  title: "Front-end Developer",
  email: "lindsay.walton@example.com",
  role: "Member"
},
{
  id: 2,
  name: "Courtney Henry",
  title: "Designer",
  email: "courtney.henry@example.com",
  role: "Admin"
},
{
  id: 3,
  name: "Tom Cook",
  title: "Director of Product",
  email: "tom.cook@example.com",
  role: "Member"
},
{
  id: 4,
  name: "Whitney Francis",
  title: "Copywriter",
  email: "whitney.francis@example.com",
  role: "Admin"
},
{
  id: 5,
  name: "Leonard Krasner",
  title: "Senior Designer",
  email: "leonard.krasner@example.com",
  role: "Owner"
},
{
  id: 6,
  name: "Floyd Miles",
  title: "Principal Designer",
  email: "floyd.miles@example.com",
  role: "Member"
},
{
  id: 7,
  name: "Jane Doe",
  title: "Marketing Manager",
  email: "jane.doe@example.com",
  role: "Member"
},
{
  id: 8,
  name: "John Smith",
  title: "Backend Developer",
  email: "john.smith@example.com",
  role: "Admin"
},
{
  id: 9,
  name: "Emily Stone",
  title: "UX Researcher",
  email: "emily.stone@example.com",
  role: "Member"
},
{
  id: 10,
  name: "Michael Brown",
  title: "DevOps Engineer",
  email: "michael.brown@example.com",
  role: "Member"
},
{
  id: 11,
  name: "Olivia Johnson",
  title: "Content Strategist",
  email: "olivia.johnson@example.com",
  role: "Member"
},
{
  id: 12,
  name: "Daniel Roberts",
  title: "Data Scientist",
  email: "daniel.roberts@example.com",
  role: "Admin"
},
{
  id: 13,
  name: "Sophia Turner",
  title: "HR Manager",
  email: "sophia.turner@example.com",
  role: "Owner"
},
{
  id: 14,
  name: "Jacob Martinez",
  title: "Cloud Architect",
  email: "jacob.martinez@example.com",
  role: "Member"
},
{
  id: 15,
  name: "Emma White",
  title: "Customer Support Lead",
  email: "emma.white@example.com",
  role: "Member"
},
{
  id: 16,
  name: "Liam Harris",
  title: "IT Specialist",
  email: "liam.harris@example.com",
  role: "Admin"
},
{
  id: 17,
  name: "Mia Clark",
  title: "Business Analyst",
  email: "mia.clark@example.com",
  role: "Member"
},
{
  id: 18,
  name: "Benjamin Walker",
  title: "Full-stack Developer",
  email: "benjamin.walker@example.com",
  role: "Member"
},
{
  id: 19,
  name: "Charlotte Lewis",
  title: "Legal Advisor",
  email: "charlotte.lewis@example.com",
  role: "Owner"
},
{
  id: 20,
  name: "James Young",
  title: "Project Manager",
  email: "james.young@example.com",
  role: "Admin"
}




]

const isLoading = false

const page = ref(1)
const q = ref('')

const pageCount = 10


const filteredRows = computed(() => {
  if (!q.value) {
    return people
  }

  return people.filter((person) => {
    return Object.values(person).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase())
    })
  })
})

const Slicedrows = computed(() => {
  const start = (page.value - 1) * pageCount;
  const end = page.value * pageCount;
  
  return filteredRows.value.slice(start, end);
});


</script>

<template>
  <div>
    <div class="flex items-center px-3 py-3.5 border-b border-gray-200 dark:border-gray-700 h-20">
      <img src="../assets/sproutifart.png" alt="sproutifart" class="h-20 m-5"  >
      <p class="text-3xl m-2 text-fern-500 font-extrabold">Sproutifart</p>
      <UInput v-model="q" placeholder="Rechercher un artiste, une musique..." class="w-80 ml-5"/>
    </div>

    <UTable 
    :rows="Slicedrows" 
    :columns="columns" 
    :loading="isLoading"
    :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }"
    :progress="{ color: 'primary', animation: 'carousel' }"

    >
    
    </UTable>
    <UPagination v-model="page" :page-count="pageCount" :total="people.length" class="ml-5" />

  </div>




</template>